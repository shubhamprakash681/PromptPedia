"use client";

import Profile from "@components/Profile";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = ({}) => {
  const params = useParams();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserPosts = async (username) => {
      const res = await fetch(`/api/users/${username}`);

      const { prompts, user } = await res.json();

      setPosts(prompts);
      setUserData(user);
    };

    if (params?.username) {
      fetchUserPosts(params.username);
    }
  }, [params?.username]);

  const tagClickHandler = (tag) => {
    router.push(`/?keyword=${tag}`);
  };

  return (
    <>
      <Profile
        name={"User"}
        desc={`Welcome to ${userData?.username} profile page`}
        posts={posts}
        tagClickHandler={tagClickHandler}
      />
    </>
  );
};

export default page;
