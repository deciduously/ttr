table! {
    games (id) {
        id -> Varchar,
        playername -> Varchar,
        currenttile -> Int4,
        chutzpah -> Int4,
    }
}

table! {
    tiles (id) {
        id -> Varchar,
        name -> Varchar,
    }
}

allow_tables_to_appear_in_same_query!(
    games,
    tiles,
);
