/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreatePost = {
  postedAt: Scalars["String"];
  text: Scalars["String"];
};

export type MutationRoot = {
  __typename?: "MutationRoot";
  createPost: Post;
  deletePost: Scalars["Boolean"];
  updatePost: Post;
};

export type MutationRootCreatePostArgs = {
  input: CreatePost;
};

export type MutationRootDeletePostArgs = {
  id: Scalars["Int"];
};

export type MutationRootUpdatePostArgs = {
  input: UpdatePost;
};

export type Post = {
  __typename?: "Post";
  id: Scalars["Int"];
  postedAt?: Maybe<Scalars["String"]>;
  text: Scalars["String"];
};

export type QueryRoot = {
  __typename?: "QueryRoot";
  hello: Scalars["String"];
  post: Post;
  posts: Array<Post>;
};

export type QueryRootPostArgs = {
  id: Scalars["Int"];
};

export type UpdatePost = {
  id: Scalars["Int"];
  postedAt?: InputMaybe<Scalars["String"]>;
  text?: InputMaybe<Scalars["String"]>;
};

export type PostsQueryQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQueryQuery = {
  __typename?: "QueryRoot";
  posts: Array<{ __typename?: "Post"; id: number; text: string }>;
};

export const PostsQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PostsQuery" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "posts" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "text" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostsQueryQuery, PostsQueryQueryVariables>;
