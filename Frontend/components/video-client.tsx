"use client"

import { useState, useEffect } from "react"
import { VideoHeader } from "@/components/client/video-header"
import { VideoFeatured } from "@/components/client/video-featured"
import { VideoGrid } from "@/components/client/video-grid"
import { VideoPlayer } from "@/components/client/video-player"
import { VideoSidebar } from "@/components/client/video-sidebar"
import type { Video } from "@/components/admin-dashboard"

export default function VideoClient() {
  const [videos, setVideos] = useState<Video[]>([])
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"browse" | "watch">("browse")

  // Fetch videos (simulated)
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)

      // Simulate API call with sample data
      setTimeout(() => {
        const sampleVideos: Video[] = [
          {
            id: "1",
            title: "Introduction to Our Platform",
            description: "Learn how to use our platform effectively with this comprehensive guide.",
            url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            thumbnail: "/placeholder.svg?height=180&width=320",
            duration: 120,
            uploadDate: new Date("2023-03-15"),
            sequence: 1,
          },
          {
            id: "2",
            title: "Product Demo - New Features",
            description: "Explore the exciting new features in our latest product update.",
            url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            thumbnail: "/placeholder.svg?height=180&width=320",
            duration: 180,
            uploadDate: new Date("2023-04-20"),
            sequence: 2,
          },
          {
            id: "3",
            title: "Customer Success Story",
            description: "Hear how our platform helped transform business operations for a leading company.",
            url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            thumbnail: "/placeholder.svg?height=180&width=320",
            duration: 240,
            uploadDate: new Date("2023-05-10"),
            sequence: 3,
          },
          {
            id: "4",
            title: "Advanced Tips and Tricks",
            description: "Take your skills to the next level with these advanced techniques.",
            url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            thumbnail: "/placeholder.svg?height=180&width=320",
            duration: 300,
            uploadDate: new Date("2023-06-05"),
            sequence: 4,
          },
          {
            id: "5",
            title: "Industry Insights",
            description: "Expert analysis on current trends and future directions in the industry.",
            url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            thumbnail: "/placeholder.svg?height=180&width=320",
            duration: 360,
            uploadDate: new Date("2023-07-12"),
            sequence: 5,
          },
          {
            id: "6",
            title: "Quick Start Guide",
            description: "Get up and running in minutes with this quick start guide.",
            url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            thumbnail: "/placeholder.svg?height=180&width=320",
            duration: 90,
            uploadDate: new Date("2023-08-18"),
            sequence: 6,
          },
        ]

        setVideos(sampleVideos)
        setIsLoading(false)
      }, 1000)
    }

    fetchVideos()
  }, [])

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video)
    setViewMode("watch")

    // Update URL without page refresh
    window.history.pushState({}, "", `/client/watch/${video.id}`)
  }

  const handleBackToBrowse = () => {
    setViewMode("browse")
    window.history.pushState({}, "", "/client")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <VideoHeader onBackToBrowse={handleBackToBrowse} viewMode={viewMode} />

      <main className="flex-1">
        {viewMode === "browse" ? (
          <div className="container mx-auto px-4 py-6 space-y-8">
            {!isLoading && videos.length > 0 && <VideoFeatured video={videos[0]} onVideoSelect={handleVideoSelect} />}

            <VideoGrid videos={videos} isLoading={isLoading} onVideoSelect={handleVideoSelect} />
          </div>
        ) : (
          <div className="container mx-auto px-4 py-6">
            {selectedVideo && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <VideoPlayer video={selectedVideo} />
                </div>
                <div className="lg:col-span-1">
                  <VideoSidebar
                    currentVideo={selectedVideo}
                    videos={videos.filter((v) => v.id !== selectedVideo.id)}
                    onVideoSelect={handleVideoSelect}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Video Streaming Platform. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

