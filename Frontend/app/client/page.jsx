import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, ThumbsUp } from "lucide-react"
import Link from "next/link"

// Mock data for videos
const featuredVideos = [
  {
    id: 1,
    title: "Getting Started with React",
    duration: "12:34",
    views: 1245,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
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

const recentVideos = [
  {
    id: 5,
    title: "Introduction to TypeScript",
    duration: "15:22",
    views: 421,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: 6,
    title: "React Hooks Tutorial",
    duration: "20:15",
    views: 312,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: 7,
    title: "CSS Grid Layout",
    duration: "10:05",
    views: 287,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: 8,
    title: "Node.js Basics",
    duration: "16:40",
    views: 198,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
]

const popularVideos = [
  {
    id: 9,
    title: "Full Stack Development",
    duration: "32:18",
    views: 1876,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: 10,
    title: "Responsive Web Design",
    duration: "14:55",
    views: 1543,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: 11,
    title: "State Management in React",
    duration: "22:30",
    views: 1287,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
  {
    id: 12,
    title: "API Development with Express",
    duration: "19:15",
    views: 1098,
    thumbnail: "/placeholder.svg?height=720&width=1280",
  },
]

export default function ClientHome() {
  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-10">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <img
            src="/placeholder.svg?height=720&width=1280"
            alt="Featured video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">Master Web Development</h1>
            <p className="text-white/80 mb-4 max-w-2xl">
              Learn the latest web development techniques and tools with our comprehensive video series.
            </p>
            <Link href="/client/video/featured">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
                <Play className="h-4 w-4" />
                Watch Now
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <Tabs defaultValue="featured">
          <TabsList className="mb-6">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
}

function VideoCard({ video }) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/client/video/${video.id}`}>
        <div className="relative aspect-video">
          <img src={video.thumbnail || "/placeholder.svg"} alt={video.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/client/video/${video.id}`}>
          <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">{video.title}</h3>
        </Link>
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <div className="flex items-center">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {video.views.toLocaleString()} views
          </div>
          <div className="flex items-center ml-3">
            <Clock className="h-3 w-3 mr-1" />
            {video.duration}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

