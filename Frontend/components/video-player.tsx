"use client"

import { useState, useRef, useEffect } from "react"
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
  Share2,
  ThumbsUp,
  Bookmark,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import type { Video } from "@/components/admin-dashboard"
import { cn } from "@/lib/utils"

interface VideoPlayerProps {
  video: Video
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handleLoadedMetadata = () => {
      setDuration(videoElement.duration)
    }

    const handleTimeUpdate = () => {
      setCurrentTime(videoElement.currentTime)
    }

    const handleWaiting = () => {
      setIsBuffering(true)
    }

    const handlePlaying = () => {
      setIsBuffering(false)
    }

    videoElement.addEventListener("loadedmetadata", handleLoadedMetadata)
    videoElement.addEventListener("timeupdate", handleTimeUpdate)
    videoElement.addEventListener("waiting", handleWaiting)
    videoElement.addEventListener("playing", handlePlaying)

    return () => {
      videoElement.removeEventListener("loadedmetadata", handleLoadedMetadata)
      videoElement.removeEventListener("timeupdate", handleTimeUpdate)
      videoElement.removeEventListener("waiting", handleWaiting)
      videoElement.removeEventListener("playing", handlePlaying)
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (value: number[]) => {
    if (!videoRef.current) return

    const newVolume = value[0]
    setVolume(newVolume)
    videoRef.current.volume = newVolume

    if (newVolume === 0) {
      setIsMuted(true)
    } else if (isMuted) {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return

    if (isMuted) {
      videoRef.current.volume = volume
      setIsMuted(false)
    } else {
      videoRef.current.volume = 0
      setIsMuted(true)
    }
  }

  const handleSeek = (value: number[]) => {
    if (!videoRef.current) return

    const newTime = value[0]
    videoRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const toggleFullscreen = () => {
    if (!playerRef.current) return

    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  const handleMouseMove = () => {
    setShowControls(true)

    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }

    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  const skipBackward = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = Math.max(0, currentTime - 10)
  }

  const skipForward = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = Math.min(duration, currentTime + 10)
  }

  return (
    <div className="space-y-4">
      <div
        ref={playerRef}
        className="relative aspect-video bg-black rounded-lg overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={video.url}
          poster={video.thumbnail}
          className="w-full h-full"
          onClick={togglePlay}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
            onClick={togglePlay}
          >
            <div className="rounded-full bg-background/80 p-4">
              <Play className="h-8 w-8" />
            </div>
          </div>
        )}

        {/* Buffering Indicator */}
        {isBuffering && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Video Controls */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-2 transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
        >
          {/* Progress Bar */}
          <div className="mb-2">
            <Slider
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={0.1}
              onValueChange={handleSeek}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20" onClick={togglePlay}>
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={skipBackward}
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={skipForward}
              >
                <SkipForward className="h-5 w-5" />
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                <div className="w-20 hidden sm:block">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                  />
                </div>
              </div>

              <span className="text-xs text-white">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">{video.title}</h1>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <span>
              {new Date(video.uploadDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
            <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <ThumbsUp className="h-4 w-4" />
            Like
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Bookmark className="h-4 w-4" />
            Save
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground whitespace-pre-line">{video.description}</p>
        </div>
      </div>
    </div>
  )
}

