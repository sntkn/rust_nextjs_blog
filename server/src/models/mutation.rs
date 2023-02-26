use super::Post;
use anyhow::Result;
use async_graphql::{Context, InputObject, Object};
use sqlx::SqlitePool;

#[derive(InputObject)]
struct CreatePost {
    text: String,
    posted_at: String,
}

pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn post<'ctx>(&self, ctx: &Context<'ctx>, input: CreatePost) -> Result<Post> {
        let pool = ctx.data::<SqlitePool>().unwrap();
        let sql = r#"
        INSERT INTO posts (text, posted_at, created_at, updated_at)
            values($1, $2, datetime ('now', 'localtime'), datetime ('now', 'localtime'))
        RETURNING
            *
        "#;
        let res = sqlx::query_as::<_, Post>(sql)
            .bind(input.text)
            .bind(input.posted_at)
            .fetch_one(pool)
            .await?;
        Ok(res)
    }
}
