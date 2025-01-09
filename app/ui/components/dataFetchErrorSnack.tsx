// @TODO make this a proper snackbar
export default function DataFetchErrorSnack({ messages }: { messages: string[] }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 text-white">
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
