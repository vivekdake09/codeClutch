"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VideoUploader } from "@/components/video-uploader"
import { VideoList } from "@/components/video-list"
import { VideoSequencer } from "@/components/video-sequencer"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function AdminDashboard() {
  const [videos, setVideos] = useState<Video[]>([])

  // Handle newly uploaded videos
  const handleVideoUploaded = (newVideo: Video) => {
    setVideos((prevVideos) => [...prevVideos, newVideo])
  }

  // Handle video sequence updates
  const handleSequenceUpdated = (reorderedVideos: Video[]) => {
    setVideos(reorderedVideos)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Video Management" description="Upload, manage, and sequence your videos" />

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="manage">Manage</TabsTrigger>
          <TabsTrigger value="sequence">Sequence</TabsTrigger>
        </TabsList>
        <TabsContent value="upload" className="space-y-4">
          <VideoUploader onVideoUploaded={handleVideoUploaded} />
        </TabsContent>
        <TabsContent value="manage" className="space-y-4">
          <VideoList videos={videos} onVideosChanged={setVideos} />
        </TabsContent>
        <TabsContent value="sequence" className="space-y-4">
          <VideoSequencer videos={videos} onSequenceUpdated={handleSequenceUpdated} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

export interface Video {
  id: string
  title: string
  description?: string
  url: string
  thumbnail?: string
  duration?: number
  uploadDate: Date
  sequence?: number
}

