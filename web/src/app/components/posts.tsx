import { graphql } from "@/gql";
import { graphQLClient } from "@/lib/graphql-client";

// postsQueryDocument is now fully typed!
const postsQueryDocument = graphql(/* GraphQL */ `
  query PostsQuery {
    posts {
      id
      title
      body
      postedAt
    }
  }
`);

export const posts = async () => {
  const result = await graphQLClient.PostsQuery();
  return result.data.posts;
};
