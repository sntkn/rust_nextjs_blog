pub mod mutation;
pub mod query;

use async_graphql::{EmptySubscription, Schema, SimpleObject};
use mutation::MutationRoot;
use query::QueryRoot;
use sqlx::FromRow;

pub type BlogSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

#[derive(SimpleObject, FromRow, Debug)]
pub struct Post {
    id: i32,
    text: String,
    posted_at: Option<String>, // DateTime 型だと SimpleObject の型に一致しない
}
