use anyhow::Result;
use async_graphql::{
    http::GraphiQLSource, Context, EmptySubscription, InputObject, Object, Schema, SimpleObject,
};
use async_graphql_rocket::{GraphQLQuery, GraphQLRequest, GraphQLResponse};
use rocket::{response::content, State};
use sqlx::{FromRow, SqlitePool};

#[derive(SimpleObject, FromRow, Debug)]
pub struct Post {
    id: i32,
    text: String,
    posted_at: Option<String>, // DateTime 型だと SimpleObject の型に一致しない
}

struct QueryRoot;

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

    async fn posts<'ctx>(&self, ctx: &Context<'ctx>) -> Result<Vec<Post>> {
        let pool = ctx.data::<SqlitePool>().unwrap();
        let res = sqlx::query_as::<_, Post>("select * from posts")
            .fetch_all(pool)
            .await?;
        Ok(res)
    }
}

#[derive(InputObject)]
struct CreatePost {
    text: String,
    posted_at: String,
}

struct MutationRoot;

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

type BlogSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

#[rocket::get("/")]
fn graphiql() -> content::RawHtml<String> {
    content::RawHtml(GraphiQLSource::build().endpoint("/graphql").finish())
}

#[rocket::get("/graphql?<query..>")]
async fn graphql_query(schema: &State<BlogSchema>, query: GraphQLQuery) -> GraphQLResponse {
    query.execute(schema.inner()).await
}

#[rocket::post("/graphql", data = "<request>", format = "application/json")]
async fn graphql_request(schema: &State<BlogSchema>, request: GraphQLRequest) -> GraphQLResponse {
    request.execute(schema.inner()).await
}

#[rocket::launch]
async fn rocket() -> _ {
    let pool = SqlitePool::connect("sqlite://db.sqlite?mode=rwc")
        .await
        .unwrap();
    let schema = Schema::build(QueryRoot, MutationRoot, EmptySubscription)
        .data(pool)
        .finish();
    rocket::build().manage(schema).mount(
        "/",
        rocket::routes![graphql_query, graphql_request, graphiql],
    )
}
