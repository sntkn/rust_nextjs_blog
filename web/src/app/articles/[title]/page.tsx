import ClientComponent from "./client-component";
import { post } from "./content";

export type Post = {
  id: number;
  title: string;
  body: string;
  postedAt: string | null | undefined;
};

export default async function PostByTitle({ params }: { params: { title: string } }) {
  const data = await post(params.title);

  const postdata: Post = {
    id: data.id,
    title: data.title,
    body: data.body,
    postedAt: data.postedAt,
  };
  return <>{data ? <ClientComponent {...postdata} /> : <div>404</div>}</>;
}
