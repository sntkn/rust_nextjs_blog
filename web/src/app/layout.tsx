import "./globals.css";
import Header from "./header";
import { GqlClient } from "@/app/components/gql_client";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <GqlClient>{children}</GqlClient>
      </body>
    </html>
  );
}
