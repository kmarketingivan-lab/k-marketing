"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { SITE } from "@/lib/constants";

type Message = { role: "assistant" | "user"; content: string };

const MAX_INPUT_LENGTH = 500;
const MAX_USER_MESSAGES = 20;
const MIN_SEND_INTERVAL_MS = 3000; // 1 message every 3 seconds

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function renderMessageContent(text: string) {
  const parts = text.split(URL_REGEX);
  return parts.map((part, i) =>
    URL_REGEX.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-orange-400 hover:text-orange-300"
      >
        {part}
      </a>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function Chatbot() {
  const t = useTranslations("chatbot");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [limitReached, setLimitReached] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSendRef = useRef(0);

  // Count user messages
  const userMessageCount = messages.filter((m) => m.role === "user").length;

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ role: "assistant", content: t("greeting") }]);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, MAX_INPUT_LENGTH);
      if (!trimmed || loading) return;

      // Rate limit: min interval between sends
      const now = Date.now();
      if (now - lastSendRef.current < MIN_SEND_INTERVAL_MS) return;
      lastSendRef.current = now;

      // Session message limit
      if (userMessageCount >= MAX_USER_MESSAGES) {
        setLimitReached(true);
        return;
      }

      const userMsg: Message = { role: "user", content: trimmed };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput("");
      setLoading(true);

      try {
        const apiMessages = newMessages.map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        });

        if (res.status === 429) {
          // Rate limited
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: t("rateLimited") },
          ]);
        } else if (res.ok) {
          const data = await res.json();
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.reply },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: t("errorMsg") },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: t("errorMsg") },
        ]);
      } finally {
        setLoading(false);
      }

      // Check if limit reached after this message
      if (userMessageCount + 1 >= MAX_USER_MESSAGES) {
        setLimitReached(true);
      }
    },
    [messages, loading, t, userMessageCount]
  );

  const handleQuickOption = (key: string) => {
    const text = t(`options.${key}`);
    sendMessage(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const toggleChat = () => {
    setOpen(!open);
    setShowBadge(false);
  };

  // Show quick options only if there's just the greeting
  const showQuickOptions = messages.length <= 1 && !loading;
  const inputDisabled = loading || limitReached;

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed bottom-20 right-4 z-[91] flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-gray-100/[0.08] bg-navy-900 shadow-2xl transition-all duration-300 md:right-6 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-orange-500 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
              <line x1="10" y1="22" x2="14" y2="22" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white">
              {t("headerTitle")}
            </h4>
            <p className="text-[0.65rem] text-white/70">{t("headerSub")}</p>
          </div>
          <button
            onClick={toggleChat}
            className="rounded-full p-1 text-white/70 transition-colors hover:text-white"
            aria-label="Chiudi chat"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* AI disclaimer */}
        <div className="border-b border-gray-100/[0.06] bg-navy-800/50 px-4 py-1.5 text-center">
          <p className="text-[0.6rem] text-gray-100/30">{t("aiDisclaimer")}</p>
        </div>

        {/* Messages */}
        <div className="flex h-[300px] flex-col gap-3 overflow-y-auto p-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[0.8125rem] leading-relaxed break-words ${
                msg.role === "assistant"
                  ? "self-start rounded-bl-sm border border-gray-100/[0.08] bg-navy-800 text-gray-100/80"
                  : "self-end rounded-br-sm bg-orange-500 text-white"
              }`}
              style={{ animation: "chatFadeIn 0.3s ease" }}
            >
              {renderMessageContent(msg.content)}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div
              className="flex max-w-[85%] items-center gap-1.5 self-start rounded-2xl rounded-bl-sm border border-gray-100/[0.08] bg-navy-800 px-4 py-3"
              style={{ animation: "chatFadeIn 0.3s ease" }}
            >
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-100/40 [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-100/40 [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-100/40 [animation-delay:300ms]" />
            </div>
          )}

          {/* Limit reached message */}
          {limitReached && (
            <div
              className="self-start rounded-2xl rounded-bl-sm border border-orange-500/20 bg-orange-500/10 px-4 py-2.5 text-[0.8125rem] leading-relaxed text-orange-300"
              style={{ animation: "chatFadeIn 0.3s ease" }}
            >
              {t("limitReached")}
            </div>
          )}

          <div ref={messagesEnd} />
        </div>

        {/* Quick Options */}
        {showQuickOptions && (
          <div className="flex flex-wrap gap-2 border-t border-gray-100/[0.08] px-4 py-3">
            {(["clients", "website", "pricing", "booking"] as const).map(
              (key) => (
                <button
                  key={key}
                  onClick={() => handleQuickOption(key)}
                  className="rounded-full border border-gray-100/[0.08] bg-navy-800 px-3 py-1.5 text-[0.75rem] text-gray-100/70 transition-colors hover:border-orange-500 hover:text-gray-100"
                >
                  {t(`options.${key}`)}
                </button>
              )
            )}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 border-t border-gray-100/[0.08] p-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
            placeholder={
              limitReached ? t("limitPlaceholder") : t("placeholder")
            }
            disabled={inputDisabled}
            className="flex-1 rounded-xl border border-gray-100/[0.08] bg-navy-800 px-3 py-2 text-sm text-gray-100 placeholder:text-gray-100/30 focus:border-orange-500 focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={inputDisabled || !input.trim()}
            className="rounded-xl bg-orange-500 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-400 disabled:opacity-50"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>

        {/* Booking link */}
        <div className="border-t border-gray-100/[0.08] px-4 py-2 text-center">
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.7rem] font-medium text-orange-500/80 transition-colors hover:text-orange-400"
          >
            {t("bookCta")} →
          </a>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-orange-500/40 md:right-6"
        aria-label="Chat"
      >
        {showBadge && !open && (
          <span className="absolute -right-1 -top-1 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-navy-900 bg-red-500" />
        )}
        {open ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
        )}
      </button>

      <style jsx global>{`
        @keyframes chatFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
