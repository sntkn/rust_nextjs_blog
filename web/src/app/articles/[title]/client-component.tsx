"use client";
import { useCallback, useState } from "react";
import { Button, Card } from "@/app/blueprint";
import EditPost from "./edit";
import { Post } from "./page";
import PostBody from "@/app/postbody";
import date from "@/app/formatdate";

const Content = ({ title, body, postedAt }: Post) => (
  <Card elevation={4} className="my-5">
    <h1 className="text-2xl my-3">{title}</h1>
    <PostBody body={body} />
    <p>PostedAt: {date(postedAt)}</p>
  </Card>
);

export default function ClientComponent(props: Post) {
  const [edit, toggleEdit] = useState({ isEdit: false, text: "Edit" });
  const [post, updatePost] = useState(props);

  const handleEdit = useCallback(() => {
    const isEditAfter = {
      isEdit: !edit.isEdit,
      text: edit.isEdit ? "Return" : "Edit",
    };
    toggleEdit(isEditAfter);
  }, [edit]);

  const handleUpdatePost = useCallback(
    (post: Post) => {
      updatePost(post);
      if (edit.isEdit) {
        handleEdit();
      }
    },
    [edit, handleEdit]
  );
  return (
    <>
      <Button intent="primary" icon="document" text={edit.text} onClick={() => handleEdit()} />
      {edit.isEdit ? (
        <EditPost {...post} handleUpdatePost={handleUpdatePost} />
      ) : (
        <Content {...post} />
      )}
    </>
  );
}
