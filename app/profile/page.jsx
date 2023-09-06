"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const { data: nextAuthSession } = useSession();
  const [posts, setPosts] = useState([]);

  const deleteHandler = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((pst) => pst._id !== post._id);

        setPosts(filteredPost);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const editHandler = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const tagClickHandler = (tag) => {
    router.push(`/?keyword=${tag}`);
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      const res = await fetch(`/api/users/posts/${nextAuthSession?.user.id}`);
      // console.log("inside useEffect, res: ", res);

      const data = await res.json();

      setPosts(data);
    };

    if (nextAuthSession?.user.id) {
      fetchUserPosts();
    }
  }, [nextAuthSession]);

  return (
    <>
      {/* {console.log(posts)} */}
      <Profile
        name={"My"}
        desc={"Welcome to your personalised profile page"}
        posts={posts}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        tagClickHandler={tagClickHandler}
      />
    </>
  );
};

export default page;
