import React from "react";
import { Posts } from "@/app/components/posts";
import { GqlClient } from "@/app/components/gql_client";

export default function Home() {
  return (
    <GqlClient>
      <Posts />
    </GqlClient>
  );
}
