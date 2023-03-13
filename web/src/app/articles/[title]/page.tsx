"use client";
import { use } from "react";
import { postByTitle } from "@/app/components/post_by_title";

export default function ArticleDetail({ params }: { params: { title: string } }) {
  const data = use(postByTitle({ title: params.title }));
  return (
    <>
      <h1>記事の詳細</h1>
      <p>記事のタイトル: {data.title}</p>
    </>
  );
}
