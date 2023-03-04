use super::Post;
use anyhow::Result;
use async_graphql::{Context, Object};
use sqlx::SqlitePool;
pub struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn hello<'ctx>(&self, ctx: &Context<'ctx>) -> Result<String> {
        let pool = ctx.data::<SqlitePool>().unwrap();
        let (res,): (String,) = sqlx::query_as("select 'World!'").fetch_one(pool).await?;
        Ok(res)
    }

    async fn post<'ctx>(&self, ctx: &Context<'ctx>, id: i32) -> Result<Post> {
        let pool = ctx.data::<SqlitePool>().unwrap();
        let res = sqlx::query_as::<_, Post>("select * from posts where id=$1")
            .bind(id)
            .fetch_one(pool)
            .await?;
        Ok(res)
    }

    async fn post_by_title<'ctx>(&self, ctx: &Context<'ctx>, title: String) -> Result<Post> {
        let pool = ctx.data::<SqlitePool>().unwrap();
        let res = sqlx::query_as::<_, Post>("select * from posts where title=$1")
            .bind(title)
            .fetch_one(pool)
            .await?;
        Ok(res)
    }

    async fn posts<'ctx>(&self, ctx: &Context<'ctx>) -> Result<Vec<Post>> {
        let pool = ctx.data::<SqlitePool>().unwrap();
        let res = sqlx::query_as::<_, Post>("select * from posts")
            .fetch_all(pool)
            .await?;
        Ok(res)
    }
}
