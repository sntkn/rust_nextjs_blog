use super::Post;
use anyhow::Result;
use async_graphql::{Context, InputObject, Object};
use sqlx::SqlitePool;

#[derive(InputObject)]
struct CreatePost {
    text: String,
    posted_at: String,
}

#[derive(InputObject, Debug)]
struct UpdatePost {
    id: i32,
    text: Option<String>,
    posted_at: Option<String>,
}

pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn create_post<'ctx>(&self, ctx: &Context<'ctx>, input: CreatePost) -> Result<Post> {
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

    async fn update_post<'ctx>(&self, ctx: &Context<'ctx>, input: UpdatePost) -> Result<Post> {
        let pool = ctx.data::<SqlitePool>().unwrap();
        let sql = r#"
        UPDATE posts set text=$1, posted_at=$2, updated_at=datetime ('now', 'localtime')
        WHERE id=$3
        RETURNING
            *
        "#;
        let res = sqlx::query_as::<_, Post>(sql)
            .bind(input.text)
            .bind(input.posted_at)
            .bind(input.id)
            .fetch_one(pool)
            .await?;
        Ok(res)
    }

    async fn delete_post<'ctx>(&self, ctx: &Context<'ctx>, id: i32) -> Result<bool> {
        let pool = ctx.data::<SqlitePool>().unwrap();
        let sql = r#"
            DELETE from posts
            WHERE id=$1
            "#;
        sqlx::query(sql).bind(id).execute(pool).await?;

        Ok(true)
    }
}
