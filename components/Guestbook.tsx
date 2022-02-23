import { useRef, useState, useEffect, CSSProperties } from "react";
import { format } from "date-fns";
import { signIn, useSession } from "next-auth/react";
import useSWR, { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import Image from "next/image";
import { signOut } from "next-auth/react";
import useTranslation from "next-translate/useTranslation";
import fetcher from "lib/fetcher";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function GuestbookEntry({ entry, user }) {
  const { mutate } = useSWRConfig();
  const deleteEntry = async (e) => {
    e.preventDefault();

    await fetch(`/api/guestbook/${entry.id}`, {
      method: "DELETE",
    });

    mutate("/api/guestbook");
  };

  const { t } = useTranslation();

  return (
    <div className="flex flex-col space-y-2">
      <div className="prose w-full dark:prose-dark">{entry.body}</div>
      <div className="flex items-center space-x-3">
        <p className="text-sm text-gray-500">{entry.created_by}</p>
        <span className=" text-gray-200 dark:text-gray-800">/</span>
        <p className="text-sm text-gray-400 dark:text-gray-600">
          {format(new Date(entry.updated_at), "d MMM yyyy 'at' h:mm bb")}
        </p>
        {user && entry.created_by === user.name && (
          <>
            <span className="text-gray-200 dark:text-gray-800">/</span>
            <button className="text-sm text-red-600 dark:text-red-400" onClick={deleteEntry}>
              {t("guestbook:delete")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Guestbook({ fallbackData }) {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();
  const inputEl = useRef(null);
  const { data: entries } = useSWR("/api/guestbook", fetcher, {
    fallbackData,
  });
  const { t } = useTranslation();

  const leaveEntry = async (e) => {
    e.preventDefault();

    if (inputEl.current.value !== "") {
      setLoading(true);
      const res = await fetch("/api/guestbook", {
        body: JSON.stringify({
          body: inputEl.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        toast.error(error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }

      inputEl.current.value = "";
      mutate("/api/guestbook");
      toast.success(t("guestbook:success"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
    } else {
      toast.error(t("guestbook:error"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const containerStyle: CSSProperties = {
    position: "relative",
    width: "1rem",
    height: "1rem",
    boxSizing: "border-box",
    margin: "0 auto",
  };

  const circleStyle: CSSProperties = {
    display: "block",
    width: "1rem",
    height: "1rem",
    border: "3px solid #e9e9e9",
    borderTop: "3px solid #f90606",
    borderRadius: "50%",
    position: "absolute",
    boxSizing: "border-box",
    top: 0,
    left: 0,
  };

  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1,
  };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <div className="my-4 w-full max-w-2xl rounded border border-gray-200 bg-gray-100 p-6 dark:border-gray-800 dark:bg-gray-800">
        <h5 className="text-lg font-bold text-gray-900 dark:text-gray-100 md:text-xl">
          {session?.user ? t("guestbook:guestbook") : t("guestbook:signInGuestbook")}
        </h5>
        {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            href="/api/auth/signin/github"
            className="my-4 flex h-8 w-28 items-center justify-center rounded bg-red-500 font-bold text-white"
            onClick={(e) => {
              e.preventDefault();
              signIn("github");
            }}
          >
            {t("guestbook:signIn")}
          </a>
        )}
        {session?.user && (
          <form className="my-4 flex items-center" onSubmit={leaveEntry}>
            <input
              ref={inputEl}
              aria-label={t("guestbook:yourComment")}
              placeholder={t("guestbook:placeholder")}
              required
              className="mr-3 block h-10 w-full rounded-md border-2 border-red-500 bg-white py-2 px-4 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-600 dark:bg-[#2d2d2d] dark:text-gray-100"
            />
            <button
              className="h-10 w-28 rounded bg-gray-200 px-4 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              type="submit"
            >
              {loading ? (
                <div style={containerStyle}>
                  <motion.span
                    style={circleStyle}
                    animate={{ rotate: 360 }}
                    transition={spinTransition}
                  />
                </div>
              ) : (
                t("guestbook:sign")
              )}
            </button>
          </form>
        )}

        <p className="text-sm text-gray-800 dark:text-gray-200">{t("guestbook:tip")}</p>

        {session?.user && (
          <div className="my-4 flex items-center">
            <div className="mr-3 flex w-full items-center gap-x-2">
              <Image
                src={session.user.image}
                width={48}
                height={48}
                alt="User avatar"
                className="rounded-full"
              />
              <span>{session.user.name}</span>
            </div>
            <button
              className="h-10 w-28 rounded bg-gray-200 px-4 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              {t("guestbook:signOut")}
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-8">
        {loading && (
          <SkeletonTheme
            baseColor={theme === "dark" || resolvedTheme === "dark" ? "#202020" : "#d9d9d9"}
            highlightColor={theme === "dark" || resolvedTheme === "dark" ? "#444444" : "#ecebeb"}
          >
            <div className="flex flex-col gap-y-2">
              <Skeleton width={150} height={20} />
              <div className="flex gap-x-2">
                <Skeleton width={80} height={20} />
                <span className="text-gray-200 dark:text-gray-800">/</span>
                <Skeleton width={140} height={20} />
              </div>
            </div>
          </SkeletonTheme>
        )}
        {entries?.map((entry) => (
          <GuestbookEntry key={entry.id} entry={entry} user={session?.user} />
        ))}
      </div>
    </>
  );
}
