"use client";
import { GqlClient } from "@/app/components/gql_client";
import { PostByTitle } from "@/app/components/post_by_title";

export default function ArticleDetail({ params }: { params: { title: string } }) {
  return (
    <GqlClient>
      <PostByTitle title={params.title} />
    </GqlClient>
  );
}
