import gql from "graphql-tag";
import { graphQLClient } from "@/lib/graphql-client";

// postsQueryDocument is now fully typed!
const postsQueryDocument = gql`
  query PostsQuery {
    posts {
      id
      title
      body
      postedAt
    }
  }
`;

export const posts = async () => {
  const result = await graphQLClient.PostsQuery();
  return result.data.posts;
};
