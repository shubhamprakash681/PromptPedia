import React from "react";
import PromptCard from "./PromptCard";

const Profile = ({
  name,
  desc,
  posts = [],
  editHandler,
  deleteHandler,
  tagClickHandler,
}) => {
  return (
    <>
      <section className="w-full">
        <h1 className="head_text text-left">
          <span className="blue_gradient">{name} Profile</span>
        </h1>

        <p className="desc text-left">{desc}</p>

        <div className="mt-10 prompt_layout">
          {posts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => editHandler && editHandler(post)}
              handleDelete={() => deleteHandler && deleteHandler(post)}
              handleTagClick={(e) => tagClickHandler && tagClickHandler(e)}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Profile;
