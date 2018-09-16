-- Your SQL goes here
-- Tiles will be a separate table
CREATE TABLE games (
    id VARCHAR PRIMARY KEY,
    playerName VARCHAR NOT NULL,
    currentTile INTEGER NOT NULL,
    chutzpah INTEGER NOT NULL
)