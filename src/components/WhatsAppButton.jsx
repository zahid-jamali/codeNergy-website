"use client";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function WhatsAppButton() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);

  const sendMessage = async () => {
    const text = message.trim();

    if (!text) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.CHAT_SERVER}?message=${encodeURIComponent(text)}`,
        {
          method: "POST",
        },
      );
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: data.response || data.bot_response || "No response received.",
        },
      ]);
    } catch (error) {
      console.error("Chat API error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Fixed Chat / WhatsApp Container */}
      <div
        className="
          fixed
          bottom-4 right-4
          md:bottom-8 md:right-8
          z-[999999]
          flex flex-col items-end
        "
      >
        {/* Chatbot */}

        {chatOpen && (
          <div
            className="
      mb-4
      w-[calc(100vw-2rem)]
      max-w-[380px]
      h-[500px]
      overflow-hidden
      rounded-2xl
      bg-black
      text-white
      shadow-[0_20px_70px_rgba(0,0,0,0.6)]
      border border-white/10
      flex flex-col
    "
          >
            {/* Header */}
            <div
              className="
        px-5 py-4
        flex items-center justify-between
        border-b border-white/10
        bg-black
      "
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="
              w-2 h-2
              rounded-full
              bg-red-500
              shadow-[0_0_10px_rgba(239,68,68,0.8)]
            "
                  />

                  <p className="font-semibold text-white">
                    CodeNergy Assistant
                  </p>
                </div>

                <p className="text-xs text-white/50 mt-1">
                  Online • Usually replies instantly
                </p>
              </div>

              <button
                type="button"
                onClick={() => setChatOpen(false)}
                className="
          w-8 h-8
          rounded-full
          flex items-center justify-center
          text-white/50
          hover:text-white
          hover:bg-red-500/15
          hover:text-red-400
          transition
        "
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div
              className="
        flex-1
        overflow-y-auto
        p-4
        space-y-3
        bg-[#080808]
      "
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`
        max-w-[82%]
        px-4 py-2.5
        rounded-2xl
        text-sm
        leading-relaxed
        ${
          msg.sender === "user"
            ? `
              bg-red-600
              text-white
              rounded-br-sm
              shadow-[0_4px_15px_rgba(220,38,38,0.2)]
            `
            : `
              bg-[#111111]
              text-white/90
              border border-white/10
              rounded-bl-sm
            `
        }
      `}
                  >
                    {msg.sender === "user" ? (
                      msg.text
                    ) : (
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => (
                            <strong className="font-bold text-white">
                              {children}
                            </strong>
                          ),

                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),

                          ul: ({ children }) => (
                            <ul className="list-disc pl-5 mb-2">{children}</ul>
                          ),

                          ol: ({ children }) => (
                            <ol className="list-decimal pl-5 mb-2">
                              {children}
                            </ol>
                          ),

                          li: ({ children }) => (
                            <li className="mb-1">{children}</li>
                          ),

                          code: ({ children }) => (
                            <code className="bg-white/10 px-1.5 py-0.5 rounded text-red-300">
                              {children}
                            </code>
                          ),
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="
        p-3
        bg-black
        border-t border-white/10
      "
            >
              <div
                className="
          flex items-center gap-2
          p-1
          rounded-xl
          bg-[#111111]
          border border-white/10
          focus-within:border-red-500/60
          transition
        "
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask CodeNergy anything..."
                  className="
            flex-1
            h-10
            px-3
            bg-transparent
            text-white
            placeholder:text-white/30
            outline-none
            text-sm
          "
                />

                <button
                  type="button"
                  onClick={sendMessage}
                  className="
            h-10
            px-4
            rounded-lg
            bg-red-600
            text-white
            text-sm
            font-medium
            hover:bg-red-500
            active:scale-95
            transition
            shadow-[0_4px_15px_rgba(220,38,38,0.25)]
          "
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Robot */}
        {!chatOpen && (
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            aria-label="Open CodeNergy chatbot"
            className="
              relative
              w-[100px]
              h-[100px]
              md:w-[115px]
              md:h-[115px]
              mb-[-4px]
              cursor-pointer
              focus:outline-none
              group
            "
          >
            <DotLottieReact
              src="/animations/robot.lottie"
              autoplay
              loop
              className="
                w-full
                h-full
                transition-transform
                duration-300
                group-hover:scale-105
                p-4
                ml-6
              "
            />
          </button>
        )}

        {/* WhatsApp */}
        <a
          href="https://wa.me/971562930563"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="
            bg-green-500
            hover:bg-green-600
            text-white
            p-4
            rounded-full
            shadow-[0_12px_30px_rgba(0,0,0,0.4)]
            transition-transform
            hover:scale-110
            active:scale-95
          "
        >
          <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
        </a>
      </div>
    </>
  );
}
