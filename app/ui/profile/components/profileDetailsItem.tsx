export default function ProfileDetailsItem({label, value}: {label: string, value: string}) {
  return (
    <div className="flex flex-row gap-2">
      <p className="text-gray-500 italic">{label}:</p>
      <p className="text-gray-300 font-bold">{value}</p>
    </div>
  )
}
