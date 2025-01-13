/*
 * Section header for an item listing breakdown
 */
export default function SectionHeader ({ title }: { title: string }) {
  return <h2 className="text-xl text-gray-500 font-bold border-b border-gray-500 pb-1 mb-4">{title}</h2>;
}
