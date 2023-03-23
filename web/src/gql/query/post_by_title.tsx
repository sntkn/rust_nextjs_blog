import gql from "graphql-tag";
import { graphQLClient } from "@/lib/graphql-client";

const postByTitleQueryDocument = gql`
  query postByTitleQuery ($title: String!) {
    postByTitle (title: $title) {
      id
      title
      body
    }
  }
`;

type PostByTitleProps = {
  title: string;
};

export const postByTitle = async ({ title }: PostByTitleProps) => {
  const result = await graphQLClient.postByTitleQuery({ title });
  return result.data.postByTitle;
};
