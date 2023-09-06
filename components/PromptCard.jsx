"use client";

import React, { useState } from "react";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const { data: nextAuthSession } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);

    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => {
      setCopied(false);
    }, 4000);
  };

  const handleProfileDivClick = () => {
    const pathName =
      nextAuthSession?.user.id === post.creator._id
        ? "/profile"
        : `/profile/${post.creator.email.split("@")[0]}`;

    router.push(pathName);
  };

  return (
    <>
      {/* {console.log("pathname: ", pathName)} */}
      <div className="prompt_card">
        <div className="flex justify-between items-start gap-5">
          <div
            className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
            onClick={handleProfileDivClick}
          >
            <Image
              src={post.creator.avatar}
              alt="user_avatar"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />

            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-900">
                {post.creator.username}
              </h3>
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            </div>
          </div>

          <div className="copy_btn" onClick={handleCopy}>
            <Image
              src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
              width={12}
              height={12}
              alt="copied"
            />
          </div>
        </div>

        <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
        <p
          onClick={() => handleTagClick && handleTagClick(post.tag)}
          className="font-inter text-sm cursor-pointer blue_gradient"
        >
          #{post.tag}
        </p>

        {/* Delete and Edit buttons on User Profile page */}
        {nextAuthSession?.user.id === post.creator._id &&
          pathName === "/profile" && (
            <>
              <div className="mt-5 flex-center border-t border-gray-200 pt-4 gap-5 ">
                <p
                  className="font-inter text-sm green_gradient cursor-pointer"
                  onClick={handleEdit}
                >
                  Edit
                </p>

                <p
                  className="font-inter text-sm orange_gradient cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </p>
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default PromptCard;
