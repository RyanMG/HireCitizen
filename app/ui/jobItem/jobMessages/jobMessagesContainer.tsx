'use client';

import TextField from "@mui/material/TextField";
import Button from "@components/button";
import { TJobMessage } from "@definitions/messages";
import { postJobMessages } from "@query/messages/actions";
import { useRef, useState } from "react";
import JobMessage from "./jobMessage";

export default function JobMessagesContainer({
  messageList,
  jobId
}: {
  messageList: TJobMessage[],
  jobId: string
}) {

  const messageInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<TJobMessage[]>(messageList);

  const sendMessage = async () => {
    if (!messageInputRef.current?.value) return;
    const newMessage = await postJobMessages(messageInputRef.current?.value, jobId);

    if (!newMessage) {
      return;
    };

    setMessages(
      [
        ...messages,
        newMessage
      ]
    );
    messageInputRef.current.value = '';
  }

  return (
    <div className="flex flex-col gap-2 bg-gray-400 p-4 rounded-md">
      {messages.length > 0 ? (
        messages.map((message) => <JobMessage key={message.id} message={message} />)
      ) : (
        <p className="text-gray-900 text-md text-center italic font-semibold">No messages yet</p>
      )}

      <div className="w-full border-b border-gray-300 my-2"></div>

      <div className="flex flex-row gap-2">
        <div className="w-full">
          <TextField
            placeholder="Send a message"
            className="w-full"
            size="small"
            inputRef={messageInputRef}
          />
        </div>

        <div className="w-32">
          <Button
            label="Send"
            theme="primary"
            onClick={sendMessage}
          />
        </div>

      </div>
    </div>
  );
}
