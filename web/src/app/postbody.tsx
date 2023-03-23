"use client";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown-light.css";
import remarkGfm from "remark-gfm";
export default function PostBody({ body }: { body: string }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown className="markdown-body" remarkPlugins={[remarkGfm]}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
