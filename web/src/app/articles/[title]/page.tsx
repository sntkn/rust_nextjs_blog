import { postByTitle } from "@/gql/query/post_by_title";

export default async function ArticleDetail({ params }: { params: { title: string } }) {
  const data = await postByTitle({ title: params.title });
  return (
    <>
      <h1>記事の詳細</h1>
      <p>記事のタイトル: {data.title}</p>
      <p>{data.body}</p>
    </>
  );
}
