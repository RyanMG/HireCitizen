'use client';

import TextField from "@mui/material/TextField";
import Button from "@components/button";

export default function JobMessagesContainer({
  messageList
}: {
  messageList: string[]
}) {

  const sendMessage = () => {
    console.log('send message');
  }

  return (
    <div className="flex flex-col gap-2 bg-gray-400 p-4 rounded-md">
      {messageList.length > 0 ? (
        messageList.map((message) => (
          <div key={message} className="flex flex-row gap-2">
            <p className="text-gray-900 text-md font-semibold">{message}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-900 text-md text-center italic font-semibold">No messages yet</p>
      )}

      <div className="w-full border-b border-gray-300 my-2"></div>

      <div className="flex flex-row gap-2">
        <TextField
          placeholder="Send a message"
          className="w-full"
          size="small"
        />
        <Button
          label="Send"
          theme="primary"
          onClick={sendMessage}
        />
      </div>
    </div>
  );
}
