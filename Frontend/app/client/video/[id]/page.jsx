"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, Volume2, VolumeX, Maximize, ThumbsUp, MessageSquare, Share2 } from "lucide-react"

// Mock data for video details
const getVideoDetails = (id) => {
  return {
    id,
    title: "Complete Guide to Modern Web Development",
    description:
      "Learn everything you need to know about modern web development in this comprehensive guide. We cover HTML, CSS, JavaScript, React, and more.",
    views: 12543,
    likes: 1876,
    uploadDate: "2023-10-15",
    duration: "24:18",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  }
}

// Mock data for related videos
const relatedVideos = [
  {
    id: 2,
    title: "Advanced CSS Techniques",
    duration: "24:18",
    views: 982,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: 3,
    title: "JavaScript Fundamentals",
    duration: "18:45",
    views: 876,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: 4,
    title: "Building a REST API",
    duration: "22:10",
    views: 543,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
]

export default function VideoPage({ params }) {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)

  const videoDetails = getVideoDetails(params.id)

  useEffect(() => {
    const video = videoRef.current

    if (video) {
      const updateTime = () => {
        setCurrentTime(video.currentTime)
        setProgress((video.currentTime / video.duration) * 100)
      }

      const handleLoadedMetadata = () => {
        setDuration(video.duration)
      }

      video.addEventListener("timeupdate", updateTime)
      video.addEventListener("loadedmetadata", handleLoadedMetadata)

      return () => {
        video.removeEventListener("timeupdate", updateTime)
        video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      }
    }
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const progressBar = e.currentTarget
      const clickPosition = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth
      const newTime = clickPosition * videoRef.current.duration

      videoRef.current.currentTime = newTime
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative bg-black rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              src={videoDetails.src}
              className="w-full aspect-video"
              onClick={togglePlay}
              onEnded={() => setIsPlaying(false)}
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-2" onClick={handleProgressClick}>
                <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="text-white" onClick={togglePlay}>
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white" onClick={toggleMute}>
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                  <span className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <Button variant="ghost" size="icon" className="text-white">
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{videoDetails.title}</h1>
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-muted-foreground">
                {videoDetails.views.toLocaleString()} views • {new Date(videoDetails.uploadDate).toLocaleDateString()}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="flex items-center">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {videoDetails.likes.toLocaleString()}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Comments
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground">{videoDetails.description}</p>
            </TabsContent>
            <TabsContent value="comments" className="mt-4">
              <p className="text-center text-muted-foreground py-8">Comments are disabled for this video</p>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Related Videos</h2>
          <div className="space-y-4">
            {relatedVideos.map((video) => (
              <RelatedVideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RelatedVideoCard({ video }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex">
        <div className="w-40 h-24 flex-shrink-0">
          <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
        </div>
        <CardContent className="p-3">
          <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{video.views.toLocaleString()} views</p>
          <p className="text-xs text-muted-foreground">{video.duration}</p>
        </CardContent>
      </div>
    </Card>
  )
}

