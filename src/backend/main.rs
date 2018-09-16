// The server will be responsible for starting the game and ticking forward
// The frontend will send a list of actions to take
// The server will apply the changes, save the gamestate, and return - what?  changes?  the whole game?
// For now, just resend the whole gamestate

extern crate actix;
extern crate actix_web;
#[macro_use]
extern crate diesel;
extern crate futures;
#[macro_use]
extern crate log;
extern crate pretty_env_logger;
extern crate r2d2;
extern crate uuid;

mod db;
mod models;
mod schema;

use actix_web::{
    middleware::{self, cors::Cors},
    server::HttpServer,
    App, AsyncResponder, HttpRequest, HttpResponse,
};
use db::DbExecutor;
use futures::{future::result, Future};

struct AppState {
    db: Addr<DbExecutor>,
}

fn new_game(_req: &HttpRequest) -> Box<Future<Item = HttpResponse, Error = actix_web::Error>> {
    let body = "Game!";
    result(Ok(HttpResponse::Ok().content_type("text/html").body(body))).responder()
}

fn serve() {
    // actix setup
    let sys = actix::System::new("mifkad");
    let addr = "127.0.0.1:8080";

    HttpServer::new(move || {
        App::new()
            .configure({
                |app| {
                    Cors::for_app(app)
                        .send_wildcard()
                        .allowed_methods(vec!["GET"])
                        .max_age(3600)
                        .resource("/game", |r| r.route().a(new_game)) // a() registers an async handler, which returns a Box<Future<Item=impl Responder, actix_web::Error>>
                        .register()
                }
            }).middleware(middleware::Logger::default())
    }).bind(addr)
    .unwrap()
    .start();
    info!("Server initialized at {}", addr);
    let _ = sys.run();
}

fn main() {
    serve();
}
