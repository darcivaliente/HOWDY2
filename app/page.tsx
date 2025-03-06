"use client";

import { useRef } from "react";
import { useChat } from "ai/react";
import clsx from "clsx";
import {
  VercelIcon,
  GithubIcon,
  LoadingCircle,
  SendIcon,
  UserIcon,
} from "./icons";
import Textarea from "react-textarea-autosize";
import Image from "next/image";

const examples = [
  "🌵 Yeehaw, tell our Wild West Product team what to focus on next",
  "🏜️ Saddle up, I need a summary of the latest trends in our customer feedback",
  "🐴 Just for fun, lasso me up a cowboy pun I can use down at the O.K. Corral",
];

export default function Chat() {
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, isLoading } = useChat({
    onResponse: (response) => {
      if (response.status === 429) {
        window.alert("You have reached your request limit for the day.");
        return;
      }
    },
  });

  const disabled = isLoading || input.length === 0;

  return (
    <main className="flex flex-col items-center justify-between pb-40 bg-[#F4A300] text-[#4F4F4F]">
      <div className="absolute top-5 hidden w-full justify-between px-5 sm:flex">
      </div>
      {messages.length > 0 ? (
        messages.map((message, i) => (
          <div
            key={i}
            className={clsx(
              "flex w-full items-center justify-center border-b border-[#E57C24] py-8",
              message.role === "user" ? "bg-[#F1C27D]" : "bg-[#F8D59A]",
            )}
          >
            <div className="flex w-full max-w-screen-md items-start space-x-4 px-5 sm:px-0">
              <div
                className={clsx(
                  message.role === "assistant"
                    ? "bg-white"
                    : "bg-black p-1.5 text-white",
                )}
              >
                {message.role === "user" ? (
                  <UserIcon />
                ) : (
                  <Image
                    src="cowgirl.png"
                    alt="HOWDY"
                    width={36}
                    height={36}
                  />
                )}
              </div>
              <div className="prose prose-p:leading-relaxed mt-1 w-full break-words">
                {message.content}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="border-[#E57C24] sm:mx-0 mx-5 mt-20 max-w-screen-md rounded-md border sm:w-full">
          <div className="flex flex-col space-y-4 p-7 sm:p-10 bg-[#F1C27D] text-[#4F4F4F]">
            <Image
              src="cowgirl.png"
              alt="HOWDY"
              width={40}
              height={40}
              className="h-20 w-20"
            />
            <h1 className="text-lg font-'Trade Winds', cursive; text-[#B7410E]">
              Well, hey there, partner! The name’s HOWDY, reckon we’ll get along just fine!
            </h1>
            <p className="text-[#4F4F4F]">
              I'm an AI partner-in-crime designed to help Product know what to explore next based on customer feedback trends built by{" "}
              <a
                href="https://www.linkedin.com/in/darci-valiente/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                Darci Valiente
              </a>. I was built using{" "}
              <a
                href="https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-black"
              >
                fine-tuned GPT4.
              </a>
            </p>
          </div>
          <div className="flex flex-col space-y-4 border-t border-[#E57C24] bg-[#F1C27D] p-7 sm:p-10">
            {examples.map((example, i) => (
              <button
                key={i}
                className="rounded-md border border-[#E57C24] bg-white px-5 py-3 text-left text-sm text-[#4F4F4F] transition-all duration-75 hover:border-[#F4A300] hover:text-[#F4A300] active:bg-[#F8D59A]"
                onClick={() => {
                  setInput(example);
                  inputRef.current?.focus();
                }}
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="fixed bottom-0 flex w-full flex-col items-center space-y-3 bg-gradient-to-b from-transparent via-[#F8D59A] to-[#F1C27D] p-5 pb-3 sm:px-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative w-full max-w-screen-md rounded-xl border border-[#E57C24] bg-white px-4 pb-2 pt-3 shadow-lg sm:pb-3 sm:pt-4"
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            required
            rows={1}
            autoFocus
            placeholder="Send a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                formRef.current?.requestSubmit();
                e.preventDefault();
              }
            }}
            spellCheck={false}
            className="w-full pr-10 focus:outline-none"
          />
          <button
            className={clsx(
              "absolute inset-y-0 right-3 my-auto flex h-8 w-8 items-center justify-center rounded-md transition-all",
              disabled
                ? "cursor-not-allowed bg-white"
                : "bg-[#F4A300] hover:bg-[#E57C24]",
            )}
            disabled={disabled}
          >
            {isLoading ? (
              <LoadingCircle />
            ) : (
              <SendIcon
                className={clsx(
                  "h-4 w-4",
                  input.length === 0 ? "text-gray-300" : "text-white",
                )}
              />
            )}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400">
          Built with{" "}
          <a
            href="https://sdk.vercel.ai/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            Vercel AI SDK
          </a>
          ,{" "}
          <a
            href="https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            OpenAI GPT-3.5-turbo, as part of a course taught by
          </a>{" "}
          Halim Madi.{" "}
          <a
            href="https://linkin.bio/yallahalim/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-black"
          >
            Learn to build your own
          </a>
          .
        </p>
      </div>
    </main>
  );
}

