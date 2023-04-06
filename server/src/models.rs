pub mod mutation;
pub mod query;
use chrono::NaiveDateTime;

use async_graphql::{EmptySubscription, Schema, SimpleObject};
use mutation::MutationRoot;
use query::QueryRoot;
use sqlx::FromRow;

pub type BlogSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

#[derive(SimpleObject, FromRow, Debug)]
pub struct Post {
    id: i32,
    title: String,
    body: String,
    posted_at: Option<NaiveDateTime>,
}
