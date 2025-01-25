'use server';

export default async function SidebarSectionHeader({
  title,
  children
}: {
  title: string,
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-1 w-full mb-4">
      <div className="text-gray-300 text-sm font-semibold">
        {title}
      </div>
      <div className="flex flex-col items-start gap-1 w-full ml-4">
        {children}
      </div>
    </div>
  )
}
