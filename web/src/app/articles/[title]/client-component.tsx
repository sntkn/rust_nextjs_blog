"use client";
import { useCallback, useState } from "react";
import { Button } from "@/app/blueprint";
import Edit from "./edit";

export default function ClientComponent({ children }: { children: Promise<JSX.Element> }) {
  const [isEdit, toggleEdit] = useState(false);
  const handleEdit = useCallback(async () => {
    toggleEdit(!isEdit);
  }, [isEdit]);
  return (
    <>
      <Button intent="primary" icon="document" text="Edit" onClick={() => handleEdit()} />
      {isEdit ? children : <Edit />}
    </>
  );
}
