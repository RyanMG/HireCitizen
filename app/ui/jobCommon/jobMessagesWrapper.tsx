import SectionHeader from "@components/sectionHeader";
import JobMessagesContainer from "./jobMessagesContainer";
import { getJobMessages } from "@query/messages/data";

export default async function JobMessages({ jobId }: { jobId: string }) {
  const messageList = await getJobMessages(jobId);

  return (
    <div>
      <SectionHeader title="Job Messages" />
      <JobMessagesContainer messageList={messageList}/>
    </div>
  );
}
