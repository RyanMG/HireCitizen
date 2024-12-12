export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex flex-row justify-between w-full border-b-2 border-gray-500 pb-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
  );
}
