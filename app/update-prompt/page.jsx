"use client";

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const promptId = searchParams.get("id");

    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);

      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [searchParams.get("id")]);

  // const createPrompt = async (e) => {
  //   e.preventDefault();

  //   setSubmitting(true);

  //   try {
  //     const res = await fetch("/api/prompt/new", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         prompt: post.prompt,
  //         tag: post.tag,
  //         userId: nextAuthSession?.user.id,
  //       }),
  //     });

  //     if (res.ok) {
  //       router.push("/");
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const updatePrompt = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const promptId = searchParams.get("id");

    if (!promptId) {
      return alert("Prompt ID not found");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PUT",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
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
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        setSubmitting={setSubmitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default page;
