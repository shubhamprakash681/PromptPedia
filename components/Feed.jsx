"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useSearchParams } from "next/navigation";

var window = "";

const PromptCardList = ({ data = [], handleTagClick }) => {
  return (
    <>
      <div className="mt-16 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        ))}
      </div>
    </>
  );
};

const Feed = () => {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const searchHandler = async (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/prompt?keyword=${searchText}`);

      const data = await res.json();

      setPosts(data);
    };

    fetchPost();
  }, [searchText]);

  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchText(keyword);
    } else {
      setSearchText("");
    }
  }, [searchParams]);

  return (
    <>
      <section className="feed">
        <form className="relative w-ful flex-center">
          <input
            type="text"
            placeholder="Search for a tag or username"
            value={searchText}
            onChange={searchHandler}
            required
            className="search_input peer"
          />
        </form>

        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      </section>
    </>
  );
};

export default Feed;
