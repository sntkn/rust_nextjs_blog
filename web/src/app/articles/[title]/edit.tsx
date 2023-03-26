"use client";
import { useCallback, useState } from "react";
import { updatePost } from "@/gql/mutation/update_post";
import { FormGroup, InputGroup, Card, TextArea, Button, Intent } from "@blueprintjs/core";
import PostBody from "@/app/postbody";
import dayjs from "dayjs";
import { Post } from "./page";

type PostWithHandUpdate = Post & {
  handleUpdatePost: (post: Post) => void;
};

export default function EditPost(props: PostWithHandUpdate) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const handleUpdate = useCallback(async () => {
    const result = await updatePost({ id: props.id, title, body, postedAt: dayjs().format() });
    if (result) {
      const postdata: Post = { id: result.id, title: result.title, body: result.body };
      props.handleUpdatePost(postdata);
    }
  }, [props, title, body]);

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
            disabled={true}
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
          text="Update"
          onClick={() => handleUpdate()}
        />
      </Card>
      <Card className="my-8 mx-4" interactive={false} elevation={2}>
        <PostBody body={body} />
      </Card>
    </div>
  );
}
