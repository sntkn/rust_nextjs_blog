import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/gql/types";

export const graphQLClient = getSdk(new GraphQLClient("http://localhost:8000/graphql"));