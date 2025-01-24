import PageWrapper from "@/app/ui/components/pageWrapper";

export default async function Messages() {
  return (
    <PageWrapper pageHeaderTitle="Citizen Message Relay">
      <div className="flex flex-col items-start gap-1 w-full">
        <div className="text-gray-400 text-sm font-semibold">
          Messages
        </div>
      </div>
    </PageWrapper>
  );
}
