//use anyhow::Result;
use dotenv::dotenv;
use sqlx::{Error, PgPool, Pool, Postgres};
use std::env;

pub struct DbPool;

impl DbPool {
    pub async fn pool() -> Result<Pool<Postgres>, Error> {
        dotenv().ok();
        let url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
        let pool = PgPool::connect(&url).await?;
        Ok(pool)
    }
}
