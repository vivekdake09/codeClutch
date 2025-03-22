"use client"

import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Video } from "@/components/admin-dashboard"

interface VideoFeaturedProps {
  video: Video
  onVideoSelect: (video: Video) => void
}

export function VideoFeatured({ video, onVideoSelect }: VideoFeaturedProps) {
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

  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="aspect-[21/9] md:aspect-[2.4/1] overflow-hidden bg-muted">
        <img
          src={video.thumbnail || "/placeholder.svg?height=720&width=1280"}
          alt={video.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/50 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8">
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{video.title}</h2>
          <p className="text-sm md:text-base text-white/80 mb-4 line-clamp-2">{video.description}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/70 mb-4">
            <span>{formatDate(video.uploadDate)}</span>
            <span className="inline-block w-1 h-1 rounded-full bg-white/70"></span>
            <span>{formatDuration(video.duration)}</span>
          </div>
          <Button size="lg" className="gap-2" onClick={() => onVideoSelect(video)}>
            <Play className="h-5 w-5" />
            Watch Now
          </Button>
        </div>
      </div>
    </div>
  )
}

