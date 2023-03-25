"use client";
import { useCallback, useState } from "react";
import { createPost } from "@/gql/mutation/create_post";
import { FormGroup, InputGroup, Card, TextArea, Button, Intent } from "@blueprintjs/core";
import PostBody from "@/app/postbody";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const handleCreate = useCallback(async () => {
    const result = await createPost({ title, body, postedAt: dayjs().format() });
    if (!result) {
      router.push(`/articles/${title}`);
    }
  }, [title, body, router]);

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
            large
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
            fill
            rows={20}
            onChange={(e) => setBody(e.target.value)}
            id="body"
            placeholder="Type something..."
            value={body}
          ></TextArea>
        </FormGroup>
        <Button
          intent={Intent.PRIMARY}
          icon="document"
          text="Create"
          onClick={() => handleCreate()}
        />
      </Card>
      <Card className="my-8 mx-4" interactive={false} elevation={2}>
        <PostBody body={body} />
      </Card>
    </div>
  );
}
