// The server will be responsible for starting the game and ticking forward
// The frontend will send a list of actions to take
// The server will apply the changes, save the gamestate, and return - what?  changes?  the whole game?
// For now, just resend the whole gamestate

extern crate actix;
extern crate actix_web;
#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate futures;
#[macro_use]
extern crate log;
extern crate pretty_env_logger;
extern crate r2d2;
extern crate uuid;

mod db;
mod models;
mod schema;

use actix::Addr;
use actix_web::{
    middleware::{self, cors::Cors},
    server::HttpServer,
    App, AsyncResponder, HttpRequest, HttpResponse,
};
use db::DbExecutor;
use diesel::{prelude::*, r2d2::ConnectionManager};
use futures::{future::result, Future};
use std::env::{var, set_var};

struct AppState {
    db: Addr<DbExecutor>,
}

fn establish_connection() -> ConnectionManager<PgConnection> {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    ConnectionManager::new(PgConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url)))
}

// Start env_logger - for now, change this number to change log level
fn init_logging(level: u64) -> Result<(), String> {
    // if RUST_BACKTRACE is set, ignore the arg given and set `trace` no matter what
    let verbosity = if var("RUST_BACKTRACE").unwrap_or_else(|_| "0".into()) == "1" {
        "trace"
    } else {
        match level {
            0 => "warn",
            1 => "info",
            2 => "debug",
            3 | _ => "trace",
        }
    };
    if verbosity == "trace" {
        set_var("RUST_BACKTRACE", "1");
    };
    set_var("RUST_LOG", verbosity);
    pretty_env_logger::init();
    info!(
        "Set verbosity to {}",
        var("RUST_LOG").unwrap_or("Could not read RUST_LOG".to_string()));
    Ok(())
}

fn new_game(_state: State<AppState>) -> Box<Future<Item = HttpResponse, Error = actix_web::Error>> {
    let body = "Game!";
    result(Ok(HttpResponse::Ok().content_type("text/html").body(body))).responder()
}

fn serve() -> Result<(), String> {
    dotenv::dotenv().ok();
    init_logging(1)?;

    // actix setup
    let sys = actix::System::new("mifkad");
    let addr = "127.0.0.1:8080";

    let db_url = var("DATABASE_URL").expect("DATABASE_URL mustt be set in .env");

    let manager = establish_connection();
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let addr = SyncArbiter::start(3, move || DbExecutor(pool.clone()));

    HttpServer::new(move || {
        App::with_state(AppState{db: addr.clone()})
            .configure({
                |app| {
                    Cors::for_app(app)
                        .send_wildcard()
                        .allowed_methods(vec!["GET"])
                        .max_age(3600)
                        // async handler, returning Box<Future<Item=HttpResponse, Error=actix_web::Error>>
                        .resource("/game", |r| r.route().with(new_game))
                        .register()
                }
            }).middleware(middleware::Logger::default())
    }).bind(addr)
    .unwrap()
    .start();
    info!("Server initialized at {}", addr);
    let _ = sys.run();
    Ok(())
}

fn main() {
    serve().unwrap();
}
