"use client";
import { use } from "react";
import Link from "next/link";
import { posts } from "@/gql/query/posts";
import { Card } from "@blueprintjs/core";

export default function Home() {
  const data = use(posts());
  return (
    <>
      <h1 className="text-3xl font-bold">Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <Card className="my-8 mx-8" interactive={false} elevation={2}>
              <h2 className="text-xl font-bold">
                <Link href={`/articles/${post.title}`}>{post.title}</Link>
              </h2>
              <p>{post.body}</p>
              <p>posted at {post.postedAt}</p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
