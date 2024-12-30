import Image from 'next/image';
import { signIn } from '@/auth';

function LoginButton({ provider, label, imagePath }: { provider: string, label: string, imagePath: string }) {
  return (
    <div className="py-2">
      <form
        action={async () => {
          "use server"
          await signIn(provider, { redirectTo: "/profile" })
        }}
      >
        <button type="submit">
          <div className="flex items-center gap-2">
            <Image className="rounded" src={imagePath} alt={label} width={30} height={30} />
            <p className="text-lg">{label}</p>
          </div>
        </button>
      </form>
    </div>
  )
}

export default function LoginForm() {
  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className={"mb-3 text-2xl"}>
        Select a provider to continue.
      </h1>
      <LoginButton provider="google" label="Sign in with Google" imagePath="/google.svg" />
      <LoginButton provider="discord" label="Sign in with Discord" imagePath="/discord.png" />
    </div>
  );
}
