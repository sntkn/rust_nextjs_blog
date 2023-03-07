"use client";

import { useState } from "react";
import { FormGroup, InputGroup, Card, TextArea } from "@/app/components/common";
import ReactMarkdown from "react-markdown";

export default function NewArticle() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
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
      </Card>
      <Card className="my-8 mx-4" interactive={false} elevation={2}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </Card>
    </div>
  );
}
