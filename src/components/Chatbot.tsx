"use client";

import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { role: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const res = await axios.post("/api/chat", { message: userMessage });
      const botReply = res.data.reply;

      setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "bot", text: "Error: could not get reply." }]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-2 rounded ${m.role === "user" ? "bg-blue-100 self-end" : "bg-gray-100 self-start"}`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <div className="p-2 border-t flex">
        <input
          className="flex-1 border rounded px-2 py-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}