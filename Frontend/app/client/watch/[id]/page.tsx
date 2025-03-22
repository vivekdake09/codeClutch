import type { Metadata } from "next"
import VideoClient from "@/components/client/video-client"

export const metadata: Metadata = {
  title: "Watch Video",
  description: "Watch your favorite videos",
}

export default function WatchPage() {
  return <VideoClient />
}

