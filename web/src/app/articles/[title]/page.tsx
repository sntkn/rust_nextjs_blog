import { postByTitle } from "@/gql/query/post_by_title";
import { Card } from "@/app/blueprint";
import PostBody from "@/app/postbody";

export default async function ArticleDetail({ params }: { params: { title: string } }) {
  const data = await postByTitle({ title: params.title });
  return (
    <>
      <h1>記事の詳細</h1>
      <Card>
        <p>記事のタイトル: {data.title}</p>
        <PostBody body={data.body} />
      </Card>
    </>
  );
}
