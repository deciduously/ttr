use super::schema::games;

#[derive(Queryable)]
pub struct Game {
    pub id: String,
    pub playername: String,
    pub currenttile: i32,
    pub chutzpah: i32,
}

#[derive(Insertable)]
#[table_name = "games"]
pub struct NewGame<'a> {
    pub id: &'a str,
    pub playername: &'a str,
    pub chutzpah: i32,
    pub currenttile: i32,
}