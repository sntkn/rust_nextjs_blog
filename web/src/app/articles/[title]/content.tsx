import { postByTitle } from "@/gql/query/post_by_title";

export const post = async (title: string) => await postByTitle({ title });
