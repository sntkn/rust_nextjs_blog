use super::Post;
use anyhow::Result;
use async_graphql::{Context, InputObject, Object};
use chrono::{DateTime, Utc};
use sqlx::PgPool;

#[derive(InputObject)]
struct CreatePost {
    title: String,
    body: String,
    posted_at: Option<DateTime<Utc>>,
}

#[derive(InputObject, Debug)]
struct UpdatePost {
    id: i32,
    title: Option<String>,
    body: Option<String>,
    posted_at: Option<DateTime<Utc>>,
}

pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn create_post<'ctx>(&self, ctx: &Context<'ctx>, input: CreatePost) -> Result<Post> {
        let pool = ctx.data::<PgPool>().unwrap();
        let sql = r#"
        INSERT INTO posts (title, body, posted_at, created_at, updated_at)
            values($1, $2, $3, now(), now())
        RETURNING
            *
        "#;
        let res = sqlx::query_as::<_, Post>(sql)
            .bind(input.title)
            .bind(input.body)
            .bind(input.posted_at)
            .fetch_one(pool)
            .await?;
        Ok(res)
    }

    async fn update_post<'ctx>(&self, ctx: &Context<'ctx>, input: UpdatePost) -> Result<Post> {
        let pool = ctx.data::<PgPool>().unwrap();
        let sql = r#"
        UPDATE posts set title=$1, body=$2, posted_at=$3, updated_at=now()
        WHERE id=$4
        RETURNING
            *
        "#;

        let res = sqlx::query_as::<_, Post>(sql)
            .bind(input.title)
            .bind(input.body)
            .bind(input.posted_at)
            .bind(input.id)
            .fetch_one(pool)
            .await?;
        Ok(res)
    }

    async fn delete_post<'ctx>(&self, ctx: &Context<'ctx>, id: i32) -> Result<bool> {
        let pool = ctx.data::<PgPool>().unwrap();
        let sql = r#"
            DELETE from posts
            WHERE id=$1
            "#;
        sqlx::query(sql).bind(id).execute(pool).await?;

        Ok(true)
    }
}
