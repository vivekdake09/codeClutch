"use client"

import type { Video } from "@/components/admin-dashboard"

interface VideoSidebarProps {
  currentVideo: Video
  videos: Video[]
  onVideoSelect: (video: Video) => void
}

export function VideoSidebar({ currentVideo, videos, onVideoSelect }: VideoSidebarProps) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Up Next</h3>
      <div className="space-y-3">
        {videos.map((video) => (
          <div
            key={video.id}
            className="flex gap-3 cursor-pointer hover:bg-muted p-2 rounded-lg transition-colors"
            onClick={() => onVideoSelect(video)}
          >
            <div className="relative flex-shrink-0 w-32 h-20">
              <img
                src={video.thumbnail || "/placeholder.svg?height=180&width=320"}
                alt={video.title}
                className="object-cover w-full h-full rounded-md"
              />
              <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="font-medium text-sm line-clamp-2">{video.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(video.uploadDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

