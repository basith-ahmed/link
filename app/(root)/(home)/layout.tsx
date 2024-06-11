import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Link",
  description: "Web Conferencing",
  // icons: {
  //   icon: '/icon/logo.svg'
  // }
};

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <section className="flex min-h-screen flex-1 flex-col">
        <div className="w-full">{children}</div>
      </section>
    </div>
  );
}
