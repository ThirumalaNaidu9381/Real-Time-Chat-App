import { useState } from "react";

const MessageInput = ({ onSend, onTyping }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onSend(trimmed);
      setText("");
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping(); // trigger typing on every change
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", marginTop: "10px", gap: "10px" }}
    >
      <input
        type="text"
        value={text}
        placeholder="Type a message..."
        onChange={handleChange}
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "20px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: "20px",
          background: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
