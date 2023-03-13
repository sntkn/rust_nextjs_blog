"use client";
import gql from "graphql-tag";
import { graphQLClient } from "@/lib/graphql-client";

const createPostMutationDocument = gql`
  mutation createPostMutation ($title: String!, $body: String!, $postedAt: String!) {
    createPost (input: {title: $title, body: $body, postedAt: $postedAt}) {
      id
      title
      body
    }
  }
`;

type CreatePostProps = {
  title: string;
  body: string;
  postedAt: string;
};

export const createPost = async ({ title, body, postedAt }: CreatePostProps) => {
  const result = await graphQLClient.createPostMutation({ title, body, postedAt });
  return result.data.createPost;
};
