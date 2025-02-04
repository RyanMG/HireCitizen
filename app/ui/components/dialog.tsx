import CloseIcon from "./iconBtns/closeIcon"

export default function Dialog({
  children,
  closeDialogFn
}: {
  children: React.ReactNode,
  closeDialogFn?: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-300 border border-white rounded-lg">
        <div className="flex flex-row justify-end bg-light-blue rounded-t-lg p-1">
          {closeDialogFn && <CloseIcon onClickFn={closeDialogFn} />}
        </div>

        <div className="px-6 pt-3 pb-4">
          <div className="flex flex-col">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}