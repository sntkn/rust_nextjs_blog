"use client";
import React from "react";
import { graphql } from "@/gql";
import { useQuery } from "urql";
import { createClient, Provider } from "urql";
import Link from "next/link";

const client = createClient({
  url: "http://localhost:8000/graphql",
});

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

const Posts = () => {
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
          <li key={post.id} className="underline">
            <Link href={`/articles/${post.title}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default function Home() {
  return (
    <Provider value={client}>
      <Posts />
    </Provider>
  );
}
