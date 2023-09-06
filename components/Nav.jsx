"use client";

import Image from "next/image";
import Link from "next/link";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Nav = () => {
  const { data: nextAuthSession } = useSession();

  const [providers, setProviders] = useState(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();

      // console.log("here: ", response);

      setProviders(response);
    };

    setProvider();
  }, []);

  return (
    <>
      <nav className="flex-between w-full mb-16 pt-3">
        <Link href={"/"} className="flex gap-2 flex-center">
          <Image
            src={"/assets/images/logo.svg"}
            width={30}
            height={30}
            alt="logo"
            priority
          />

          <span className="logo_text">PromptPedia</span>
        </Link>

        {/* desktop nav */}
        <div className="sm:flex hidden">
          {nextAuthSession?.user ? (
            <>
              <div className="flex gap-3 md:gap-5">
                <Link href={"/create-prompt"} className="black_btn">
                  Create Post
                </Link>

                <button type="button" onClick={signOut} className="outline_btn">
                  Sign Out
                </button>

                <Link href={"/profile"}>
                  <Image
                    src={nextAuthSession?.user?.image}
                    width={36}
                    height={36}
                    className="rounded-full"
                    alt="Profile"
                    priority
                  />
                </Link>
              </div>
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>

        {/* mobile navigation */}
        <div className="sm:hidden flex relative">
          {nextAuthSession?.user ? (
            <>
              <div className="flex">
                <Image
                  src={nextAuthSession?.user?.image}
                  priority
                  width={36}
                  height={36}
                  className="rounded-full"
                  alt="Profile"
                  onClick={() => setToggleDropdown((prev) => !prev)}
                />

                {toggleDropdown && (
                  <>
                    <div className="dropdown">
                      <Link
                        href={"/profile"}
                        className="dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                      >
                        My Profile
                      </Link>

                      <Link
                        href={"/create-prompt"}
                        className="dropdown_link"
                        onClick={() => setToggleDropdown(false)}
                      >
                        Create Prompt
                      </Link>

                      <button
                        onClick={() => {
                          setToggleDropdown(false);
                          signOut();
                        }}
                        className="mt-5 w-full black_btn"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                ))}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Nav;
