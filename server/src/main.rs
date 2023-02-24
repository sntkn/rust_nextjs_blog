use anyhow::Result;
use async_graphql::{
    http::GraphiQLSource, Context, EmptyMutation, EmptySubscription, Object, Schema,
};
use async_graphql_rocket::{GraphQLQuery, GraphQLRequest, GraphQLResponse};
use rocket::{response::content, State};
use sqlx::SqlitePool;

struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn hello<'ctx>(&self, ctx: &Context<'ctx>) -> Result<String> {
        let pool = ctx.data::<SqlitePool>().unwrap();
        let (res,): (String,) = sqlx::query_as("select 'World!'").fetch_one(pool).await?;
        Ok(res)
    }
}

type BlogSchema = Schema<QueryRoot, EmptyMutation, EmptySubscription>;

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
    let schema = Schema::build(QueryRoot, EmptyMutation, EmptySubscription)
        .data(pool)
        .finish();
    rocket::build().manage(schema).mount(
        "/",
        rocket::routes![graphql_query, graphql_request, graphiql],
    )
}
