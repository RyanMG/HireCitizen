import { ReactNode } from "react";

export default function FormWithErrorBlock ({
  error,
  children,
  halfWidth
}: {
  error: string[],
  children: ReactNode,
  halfWidth?: boolean
}): ReactNode {

  return (
    <div className={`flex flex-col gap-1 ${halfWidth ? 'w-1/2' : ''}`}>
      {children}
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {error && error.map((error: string) => (
          <p className="text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
    </div>
  );
}
