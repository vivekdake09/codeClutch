"use client"

import type { Video } from "@/components/admin-dashboard"
import { Skeleton } from "@/components/ui/skeleton"

interface VideoGridProps {
  videos: Video[]
  isLoading: boolean
  onVideoSelect: (video: Video) => void
}

export function VideoGrid({ videos, isLoading, onVideoSelect }: VideoGridProps) {
  const formatDuration = (seconds?: number) => {
    if (!seconds) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-video rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">No videos available</h2>
        <p className="text-muted-foreground">Check back later for new content</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <div key={video.id} className="group cursor-pointer" onClick={() => onVideoSelect(video)}>
            <div className="relative aspect-video overflow-hidden rounded-lg mb-2">
              <img
                src={video.thumbnail || "/placeholder.svg?height=180&width=320"}
                alt={video.title}
                className="object-cover w-full h-full transition-transform group-hover:scale-105"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                {formatDuration(video.duration)}
              </div>
            </div>
            <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">{video.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{formatDate(video.uploadDate)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

