"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const { data: nextAuthSession } = useSession();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      const res = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: nextAuthSession?.user.id,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Form
        type={"Create"}
        post={post}
        setPost={setPost}
        submitting={submitting}
        setSubmitting={setSubmitting}
        handleSubmit={createPrompt}
      />
    </>
  );
};

export default page;
