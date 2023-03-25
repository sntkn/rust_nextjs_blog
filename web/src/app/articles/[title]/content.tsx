import { postByTitle } from "@/gql/query/post_by_title";
import { Card } from "@/app/blueprint";
import PostBody from "@/app/postbody";

export default async function Content({ title }: { title: string }): Promise<JSX.Element> {
  const data = await postByTitle({ title });
  return (
    <>
      <Card elevation={4} className="my-5">
        <h1 className="text-2xl my-3">{data.title}</h1>
        <PostBody body={data.body} />
      </Card>
    </>
  );
}
