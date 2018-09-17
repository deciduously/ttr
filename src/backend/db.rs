//! Db executor actor
use actix::prelude::*;
use actix_web::{Error, Result, error};
use diesel::{self, prelude::*, r2d2::{ConnectionManager, Pool}};
use dotenv::dotenv;
use std::env::var;
use uuid;

use models;
use schema;

pub fn establish_connection_manager() -> ConnectionManager<PgConnection> {
    dotenv().ok();

    let database_url = var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    
    ConnectionManager::new(database_url)
}

/// This is db executor actor. We are going to run 3 of them in parallel.
pub struct DbExecutor(pub Pool<ConnectionManager<PgConnection>>);

/// This is only message that this actor can handle, but it is easy to extend
/// number of messages.
pub struct CreateGame {
    pub name: String,
}

impl Message for CreateGame {
    type Result = Result<models::Game, Error>;
}

impl Actor for DbExecutor {
    type Context = SyncContext<Self>;
}

impl Handler<CreateGame> for DbExecutor {
    type Result = Result<models::Game, Error>;

    fn handle(&mut self, msg: CreateGame, _: &mut Self::Context) -> Self::Result {
        use self::schema::games::dsl::*;

        let uuid = format!("{}", uuid::Uuid::new_v4());
        let new_game = models::NewGame {
            id: &uuid,
            playername: &msg.name,
            chutzpah: 1,
            currenttile: 0,
        };

        let conn: &PgConnection = &self.0.get().unwrap();

        diesel::insert_into(games)
            .values(&new_game)
            .execute(conn)
            .map_err(|_| error::ErrorInternalServerError("Error inserting game"))?;

        let mut g = games
            .filter(id.eq(&uuid))
            .load::<models::Game>(conn)
            .map_err(|_| error::ErrorInternalServerError("Error loading game"))?;

        Ok(g.pop().unwrap())
    }
}
