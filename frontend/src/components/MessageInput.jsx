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
    if (onTyping) onTyping();
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type a message..."
        className="message-input"
      />
      <button type="submit" className="send-button">Send</button>
    </form>
  );
};

export default MessageInput;
