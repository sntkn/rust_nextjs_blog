import Link from "next/link";
import { posts } from "@/gql/query/posts";
import { Card } from "@/app/blueprint";
import date from "@/app/formatdate";

export default async function Home() {
  const data = await posts();
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
              <p>posted at {date(post.postedAt)}</p>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
