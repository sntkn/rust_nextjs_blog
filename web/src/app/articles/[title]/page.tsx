export default function Article({ params }: { params: { title: string } }) {
  return (
    <div>
      <h1>記事の詳細</h1>
      <p>記事のタイトル: {params.title}</p>
    </div>
  );
}
