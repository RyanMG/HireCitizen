import SectionHeader from "@components/sectionHeader";
import JobMessagesContainer from "./jobMessagesContainer";
import { getJobMessages } from "@query/messages/data";

export default async function JobMessagesWrapper({ jobId }: { jobId: string }) {
  let messageList = await getJobMessages(jobId);

  if ('error' in messageList) {
    messageList = [];
  }

  return (
    <div>
      <SectionHeader title="Job Messages" />
      <JobMessagesContainer messageList={messageList} jobId={jobId}/>
    </div>
  );
}
