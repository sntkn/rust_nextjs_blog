import React from "react";
import { graphql } from "@/gql";
import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/gql/types";
import Link from "next/link";
import { Card } from "@/app/components/common";

export const graphQLClient = new GraphQLClient("http://localhost:8000/graphql");

// postsQueryDocument is now fully typed!
const postsQueryDocument = graphql(/* GraphQL */ `
  query PostsQuery {
    posts {
      id
      title
      body
      postedAt
    }
  }
`);

export const Posts = async () => {
  const sampleClient = getSdk(graphQLClient);
  const result = await sampleClient.PostsQuery();
  const data = result.data.posts;
  console.log(data);
  return (
    <>
      <h1 className="text-3xl font-bold">Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <Card className="my-8 mx-8" interactive={false} elevation={2}>
              <h2 className="text-xl font-bold">
                <Link href={`/articles/${post.title}`}>{post.title}</Link>
              </h2>
              <p>{post.body}</p>
              <p>posted at {post.postedAt}</p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
};
