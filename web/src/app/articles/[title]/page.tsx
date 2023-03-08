"use client";
import { PostByTitle } from "@/app/components/post_by_title";

export default function ArticleDetail({ params }: { params: { title: string } }) {
  return <PostByTitle title={params.title} />;
}
