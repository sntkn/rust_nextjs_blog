use async_graphql::{http::GraphiQLSource, EmptyMutation, EmptySubscription, Schema, SimpleObject};
use async_graphql_rocket::{GraphQLQuery, GraphQLRequest, GraphQLResponse};
use rocket::{response::content, State};

#[derive(SimpleObject)]
struct QueryRoot {
    /// Value a
    say: String,
}

pub type BlogSchema = Schema<QueryRoot, EmptyMutation, EmptySubscription>;

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
fn rocket() -> _ {
    let query_root = QueryRoot {
        say: "Hello, world!".to_string(),
    };
    let schema = Schema::build(query_root, EmptyMutation, EmptySubscription).finish();
    rocket::build().manage(schema).mount(
        "/",
        rocket::routes![graphql_query, graphql_request, graphiql],
    )
}
