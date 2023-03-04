"use client";
import React from "react";
import { graphql } from "@/gql";
import { useQuery } from "urql";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:8000/graphql",
});

const postByTitleQueryDocument = graphql(/* GraphQL */ `
  query postByTitleQuery ($title: String!) {
    postByTitle (title: $title) {
      id
      title
      body
    }
  }
`);

const PostByTitle = (props: { title: string }) => {
  const [result, reexecuteQuery] = useQuery({
    query: postByTitleQueryDocument,
    variables: { title: props.title },
  });
  const { data, fetching, error } = result;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (data === undefined) return <p>undefined...</p>;
  return (
    <>
      <h1>記事の詳細</h1>
      <p>記事のタイトル: {data.postByTitle.title}</p>
    </>
  );
};

export default function Article({ params }: { params: { title: string } }) {
  return (
    <Provider value={client}>
      <PostByTitle title={params.title} />
    </Provider>
  );
}
