/*
 * When there are no results for a category, this component is displayed
 */
export default function NoResultsBlock({ text }: { text: string }) {
  return (
    <div className="flex flex-col pt-2 items-center justify-center flex-1">
      <p className="border border-white rounded-md p-4 text-white">{text}</p>
    </div>
  );
}
