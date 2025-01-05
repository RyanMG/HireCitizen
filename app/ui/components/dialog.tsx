export default function Dialog({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-300 p-4 border border-gray-400 rounded-lg">
        <div className="flex flex-col">
          {children}
        </div>
      </div>
    </div>
  )
}