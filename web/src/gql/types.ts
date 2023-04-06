import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import { print } from "graphql";
import gql from "graphql-tag";
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
  NaiveDateTime: string;
};

export type CreatePost = {
  body: Scalars["String"];
  postedAt?: InputMaybe<Scalars["NaiveDateTime"]>;
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
  postedAt?: Maybe<Scalars["NaiveDateTime"]>;
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
  postedAt?: InputMaybe<Scalars["NaiveDateTime"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type CreatePostMutationMutationVariables = Exact<{
  title: Scalars["String"];
  body: Scalars["String"];
  postedAt: Scalars["NaiveDateTime"];
}>;

export type CreatePostMutationMutation = {
  __typename?: "MutationRoot";
  createPost: { __typename?: "Post"; id: number; title: string; body: string };
};

export type UpdatePostMutationMutationVariables = Exact<{
  id: Scalars["Int"];
  title: Scalars["String"];
  body: Scalars["String"];
  postedAt: Scalars["NaiveDateTime"];
}>;

export type UpdatePostMutationMutation = {
  __typename?: "MutationRoot";
  updatePost: {
    __typename?: "Post";
    id: number;
    title: string;
    body: string;
    postedAt?: any | null;
  };
};

export type PostByTitleQueryQueryVariables = Exact<{
  title: Scalars["String"];
}>;

export type PostByTitleQueryQuery = {
  __typename?: "QueryRoot";
  postByTitle: {
    __typename?: "Post";
    id: number;
    title: string;
    body: string;
    postedAt?: any | null;
  };
};

export type PostsQueryQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQueryQuery = {
  __typename?: "QueryRoot";
  posts: Array<{
    __typename?: "Post";
    id: number;
    title: string;
    body: string;
    postedAt?: any | null;
  }>;
};

export const CreatePostMutationDocument = gql`
    mutation createPostMutation($title: String!, $body: String!, $postedAt: NaiveDateTime!) {
  createPost(input: {title: $title, body: $body, postedAt: $postedAt}) {
    id
    title
    body
  }
}
    `;
export const UpdatePostMutationDocument = gql`
    mutation updatePostMutation($id: Int!, $title: String!, $body: String!, $postedAt: NaiveDateTime!) {
  updatePost(input: {id: $id, title: $title, body: $body, postedAt: $postedAt}) {
    id
    title
    body
    postedAt
  }
}
    `;
export const PostByTitleQueryDocument = gql`
    query postByTitleQuery($title: String!) {
  postByTitle(title: $title) {
    id
    title
    body
    postedAt
  }
}
    `;
export const PostsQueryDocument = gql`
    query PostsQuery {
  posts {
    id
    title
    body
    postedAt
  }
}
    `;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const CreatePostMutationDocumentString = print(CreatePostMutationDocument);
const UpdatePostMutationDocumentString = print(UpdatePostMutationDocument);
const PostByTitleQueryDocumentString = print(PostByTitleQueryDocument);
const PostsQueryDocumentString = print(PostsQueryDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createPostMutation(
      variables: CreatePostMutationMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{
      data: CreatePostMutationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<CreatePostMutationMutation>(
            CreatePostMutationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "createPostMutation",
        "mutation"
      );
    },
    updatePostMutation(
      variables: UpdatePostMutationMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{
      data: UpdatePostMutationMutation;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UpdatePostMutationMutation>(
            UpdatePostMutationDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "updatePostMutation",
        "mutation"
      );
    },
    postByTitleQuery(
      variables: PostByTitleQueryQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{
      data: PostByTitleQueryQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PostByTitleQueryQuery>(PostByTitleQueryDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "postByTitleQuery",
        "query"
      );
    },
    PostsQuery(
      variables?: PostsQueryQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<{ data: PostsQueryQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<PostsQueryQuery>(PostsQueryDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        "PostsQuery",
        "query"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
