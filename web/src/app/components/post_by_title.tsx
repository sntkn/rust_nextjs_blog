"use client";
import { graphql } from "@/gql";
import { graphQLClient } from "@/lib/graphql-client";

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

export const postByTitle = async ({ title }: PostByTitleProps) => {
  const result = await graphQLClient.postByTitleQuery({ title });
  return result.data.postByTitle;
};
