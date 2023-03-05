"use client";
import { createClient, Provider } from "urql";

const client = createClient({
  url: "http://localhost:8000/graphql",
});

export default function GqlClient({ children }: { children: React.ReactNode }) {
  return <Provider value={client}>{children}</Provider>;
}
