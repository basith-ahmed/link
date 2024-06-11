"use client"

import MeetingTypeList from "@/components/MeetingTypeList";
import MobileNav from "@/components/MobileNav";

// export default function Home() {

//   const now = new Date()
// const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})
// const date = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(now)

//   return (
//     <section className="flex size-full flex-col gap-10 text-white">
//       <div className="flex size-full flex-col gap-10 text-white">
//         <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
//           <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
//             <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
//               Upcoming Meeting at: 12:30pm
//             </h2>
//             <div className="flex flex-col gap-2">
//               <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
//               <p className="text-lg font-medium text-sky-1 lg:text-2xl">
//                 {date}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <MeetingTypeList />
//     </section>
//   );
// }


import { Button } from "@/components/ui/button"
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link"

import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";

import { useGetCallById } from "@/hooks/useGetCallById";
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

export default function Home() {

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
    <div className="flex h-screen w-full overflow-y-auto">
      <div className="flex-1 bg-gray-50 dark:bg-gray-950 p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-semibold">Personal Room</div>
          <div className="flex-between gap-5">
            <SignedIn>
              <UserButton />
            </SignedIn>
            <MobileNav />
          </div>
          {/* <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <SettingsIcon className="w-5 h-5 text-blue-500" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon">
              <HandHelpingIcon className="w-5 h-5 text-blue-500" />
              <span className="sr-only">Help</span>
            </Button>
          </div> */}
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Join your personal room</div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={startRoom}>Start</Button>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            Your personal room is always available for you to join. Share the link with others to invite them to your
            room.
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-md flex-1">
            {meetingLink}
            </div>
            <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white" 
              onClick={() => {
                navigator.clipboard.writeText(meetingLink);
                toast({
                  title: "Link Copied",
                });
              }}>
              Copy
            </Button>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Upcoming Meetings</div>
            <Button variant="outline" className="text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
              View all
            </Button>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 flex-shrink-0">
                <CalendarIcon className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Weekly Team Meeting</div>
                <div className="text-gray-500 dark:text-gray-400">Today, 2:00 PM - 3:00 PM</div>
              </div>
              <Button variant="ghost" size="icon">
                <MoveHorizontalIcon className="w-5 h-5 text-blue-500" />
                <span className="sr-only">More options</span>
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-3 flex-shrink-0">
                <CalendarIcon className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Design Review</div>
                <div className="text-gray-500 dark:text-gray-400">Tomorrow, 10:00 AM - 11:00 AM</div>
              </div>
              <Button variant="ghost" size="icon">
                <MoveHorizontalIcon className="w-5 h-5 text-blue-500" />
                <span className="sr-only">More options</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CalendarCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  )
}


function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function HandHelpingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
      <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 13 6 6" />
    </svg>
  )
}


function MoveHorizontalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function PlusIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function VideoIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
  )
}