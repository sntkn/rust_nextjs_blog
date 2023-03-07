"use client";
import React from "react";
import { graphql } from "@/gql";
import { useQuery } from "urql";
import Link from "next/link";
import { Card, Elevation } from "@blueprintjs/core";

// postsQueryDocument is now fully typed!
const postsQueryDocument = graphql(/* GraphQL */ `
  query PostsQuery {
    posts {
      id
      title
      body
    }
  }
`);

export const Posts = () => {
  const [result, reexecuteQuery] = useQuery({ query: postsQueryDocument });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (data === undefined) return <p>undefined...</p>;
  return (
    <>
      <h1 className="text-3xl font-bold">Posts</h1>
      <ul>
        {data.posts.map((post) => (
          <Card className="my-8 mx-8" key={post.id} interactive={false} elevation={Elevation.TWO}>
            <h2 className="text-xl font-bold">
              <Link href={`/articles/${post.title}`}>{post.title}</Link>
            </h2>
            <p>{post.body}</p>
          </Card>
        ))}
      </ul>
    </>
  );
};
