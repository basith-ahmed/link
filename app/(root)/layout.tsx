import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Link",
    description: "Web Conferencing",
    // icons: {
    //   icon: '/icon/logo.svg'
    // }
  };

export default function RootLayout({children}: {children: ReactNode}) {
    return(
        <main>
            <StreamVideoProvider>
                {children}
            </StreamVideoProvider>
        </main>
    )
}