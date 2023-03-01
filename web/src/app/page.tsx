"use client";
import React from "react";
import { graphql } from "@/gql";
import { useQuery } from "urql";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:8000",
});

// postsQueryDocument is now fully typed!
const postsQueryDocument = graphql(/* GraphQL */ `
  query PostsQuery {
    posts {
      id
      text
    }
  }
`);

const Posts = () => {
  const { data } = useQuery({ query: postsQueryDocument });
  return <div>Posts</div>;
};

export default function Home() {
  return (
    <Provider value={client}>
      <Posts />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Provider>
  );
}
