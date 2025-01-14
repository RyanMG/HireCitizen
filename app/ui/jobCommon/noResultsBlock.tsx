/*
 * When there are no results for a category, this component is displayed
 */
export default function NoResultsBlock({ text }: { text: string }) {
  return (
    <div className="flex flex-col pt-2 items-center justify-center flex-1">
      <p className="border border-gray-400 rounded-md px-4 py-2 text-gray-400">{text}</p>
    </div>
  );
}
