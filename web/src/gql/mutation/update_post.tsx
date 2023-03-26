"use client";
import gql from "graphql-tag";
import { graphQLClient } from "@/lib/graphql-client";

const updatePostMutationDocument = gql`
  mutation updatePostMutation ($id: Int!, $title: String!, $body: String!, $postedAt: String!) {
    updatePost (input: {id: $id, title: $title, body: $body, postedAt: $postedAt}) {
      id
      title
      body
    }
  }
`;

type UpdatePostProps = {
  id: number;
  title: string;
  body: string;
  postedAt: string;
};

export const updatePost = async ({ id, title, body, postedAt }: UpdatePostProps) => {
  const result = await graphQLClient.updatePostMutation({ id, title, body, postedAt });
  return result.data.updatePost;
};
