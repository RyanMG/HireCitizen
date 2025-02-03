export default function ProfileWrapper({
  children
}: {
  children: React.ReactNode
}) {
  return <div className="flex flex-col bg-gray-900 p-4 rounded-xl border border-indigo-900 min-h-[200px]">{children}</div>;
}
