import Content from "./content";
import ClientComponent from "./client-component";

export default async function ArticleDetail({ params }: { params: { title: string } }) {
  return (
    <>
      <ClientComponent>
        {/* @see https://github.com/vercel/next.js/issues/42292 */}
        {/* @ts-expect-error Server Component */}
        <Content title={params.title} />
      </ClientComponent>
    </>
  );
}
