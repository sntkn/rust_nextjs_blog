"use client";

import { useState } from "react";
import { graphql } from "@/gql";
import { FormGroup, InputGroup, Card, TextArea, Button } from "@/app/components/common";
import ReactMarkdown from "react-markdown";
import { useMutation } from "urql";
import dayjs from "dayjs";

const createPostMutationDocument = graphql(/* GraphQL */ `
  mutation createPostMutation ($title: String!, $body: String!, $postedAt: String!) {
    createPost (input: {title: $title, body: $body, postedAt: $postedAt}) {
      id
      title
      body
    }
  }
`);

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [createPostResult, createPost] = useMutation(createPostMutationDocument);
  const handleCreate = async () => {
    await createPost({ title, body, postedAt: dayjs().format() });
    return !createPostResult.error;
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      <Card className="my-8 mx-4" interactive={false} elevation={2}>
        <FormGroup
          helperText="Helper text with details..."
          label="Title"
          labelFor="title"
          labelInfo="(required)"
        >
          <InputGroup
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Input content"
          />
        </FormGroup>
        <FormGroup
          helperText="Can be entered by markdown..."
          label="Body"
          labelFor="body"
          labelInfo="(required)"
        >
          <TextArea
            className="bp4-fill"
            onChange={(e) => setBody(e.target.value)}
            id="body"
            placeholder="Type something..."
            value={body}
          ></TextArea>
        </FormGroup>
        <Button
          className="bp4-minimal"
          icon="document"
          text="Create"
          onClick={() => handleCreate()}
        />
      </Card>
      <Card className="my-8 mx-4" interactive={false} elevation={2}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </Card>
    </div>
  );
}
