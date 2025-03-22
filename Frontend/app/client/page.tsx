import type { Metadata } from "next"
import VideoClient from "@/components/client/video-client"

export const metadata: Metadata = {
  title: "Video Streaming Platform",
  description: "Watch your favorite videos in one place",
}

export default function ClientPage() {
  return <VideoClient />
}

