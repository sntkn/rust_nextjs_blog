"use client";
import { graphql } from "@/gql";
import { useQuery } from "urql";

const postByTitleQueryDocument = graphql(/* GraphQL */ `
  query postByTitleQuery ($title: String!) {
    postByTitle (title: $title) {
      id
      title
      body
    }
  }
`);

type PostByTitleProps = {
  title: string;
};

export const PostByTitle = ({ title }: PostByTitleProps) => {
  const [result, reexecuteQuery] = useQuery({
    query: postByTitleQueryDocument,
    variables: { title },
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
