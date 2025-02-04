'use server';

export default async function SidebarSectionHeader({
  title,
  children
}: {
  title: string,
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-1 w-full my-2">
      <div className="text-construction-yellow text-sm font-semibold">
        {title}
      </div>
      <div className="flex flex-col items-start gap-1 w-full ml-4">
        {children}
      </div>
    </div>
  )
}
