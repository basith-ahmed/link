"use client";

import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 xl:flex-row">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}:
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 flex flex-col gap-6">
        <div className="text-2xl font-semibold">Personal Meeting Room</div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col gap-8 xl:max-w-[900px]">
          <div className="flex flex-col gap-4">
            <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
            <Table title="Meeting ID" description={meetingId!} />
            <Table title="Invite Link" description={meetingLink} />
          </div>
          <div className="flex gap-5">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={startRoom}>
              Start Meeting
            </Button>
            <Button
              variant="outline"
              className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={() => {
                navigator.clipboard.writeText(meetingLink);
                toast({
                  title: "Link Copied",
                });
              }}
            >
              Copy Invitation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default PersonalRoom;