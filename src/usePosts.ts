import { useState } from "react";
import { postsAPI } from "./constants";
import { Post } from "./types";

export const usePosts = () => {
  const [isSending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const sendPost = async (post: Post) => {
    setSending(true);
    setStatus("Sending post...");

    try {
      const response = await fetch(postsAPI, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(post),
      });

      const data = await response.json();

      setStatus(`✅ Post sent with ID #${data.id}.`);
    } catch (error) {
      if (error instanceof Error) {
        setStatus(
          `An error occurred while sending the post: ${
            error.message || "unknown error"
          }.`
        );
      }
    }

    setSending(false);
  };

  return {
    sendPost,
    isSendingPost: isSending,
    sendPostStatus: status,
  };
};
