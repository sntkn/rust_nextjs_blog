//use anyhow::Result;
use sqlx::{Error, Pool, Sqlite, SqlitePool};

pub struct DbPool;

impl DbPool {
    pub async fn pool() -> Result<Pool<Sqlite>, Error> {
        let pool = SqlitePool::connect("sqlite://db.sqlite?mode=rwc").await?;
        Ok(pool)
    }
}
