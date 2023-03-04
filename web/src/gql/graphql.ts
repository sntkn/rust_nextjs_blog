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
  body: Scalars["String"];
  postedAt: Scalars["String"];
  title: Scalars["String"];
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
  body: Scalars["String"];
  id: Scalars["Int"];
  postedAt?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
};

export type QueryRoot = {
  __typename?: "QueryRoot";
  hello: Scalars["String"];
  post: Post;
  postByTitle: Post;
  posts: Array<Post>;
};

export type QueryRootPostArgs = {
  id: Scalars["Int"];
};

export type QueryRootPostByTitleArgs = {
  title: Scalars["String"];
};

export type UpdatePost = {
  body?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  postedAt?: InputMaybe<Scalars["String"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type PostByTitleQueryQueryVariables = Exact<{
  title: Scalars["String"];
}>;

export type PostByTitleQueryQuery = {
  __typename?: "QueryRoot";
  postByTitle: { __typename?: "Post"; id: number; title: string; body: string };
};

export type PostsQueryQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQueryQuery = {
  __typename?: "QueryRoot";
  posts: Array<{ __typename?: "Post"; id: number; title: string; body: string }>;
};

export const PostByTitleQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "postByTitleQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "title" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "postByTitle" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: { kind: "Variable", name: { kind: "Name", value: "title" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "body" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostByTitleQueryQuery, PostByTitleQueryQueryVariables>;
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
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "body" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostsQueryQuery, PostsQueryQueryVariables>;
