"use client"

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, ThumbsUp } from "lucide-react";
import Link from "next/link";

export default function ClientHome() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/videos/all")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <section className="mb-10">
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <img
            src={videos[0]?.videoUrl || "/placeholder.svg"}
            alt="Featured video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <h1 className="text-white text-2xl md:text-4xl font-bold mb-2">
              {videos[0]?.title || "Loading..."}
            </h1>
            <p className="text-white/80 mb-4 max-w-2xl">
              {videos[0]?.description || "Loading video description..."}
            </p>
            <Link href={videos[0]?.videoUrl || "#"}>
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium">
                <Play className="h-4 w-4" />
                Watch Now
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Videos</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {loading ? (
              <p>Loading videos...</p>
            ) : videos.length === 0 ? (
              <p>No videos available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                  <VideoCard key={index} video={video} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}

function VideoCard({ video }) {
  return (
    <Card className="overflow-hidden">
      <Link href={video.videoUrl}>
        <div className="relative aspect-video">
          <img src={video.videoUrl} alt={video.title} className="w-full h-full object-cover" />
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/client/video/${video.id}`}>
          <h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">
            {video.title}
          </h3>
        </Link>
        <div className="flex items-center text-xs text-muted-foreground mt-2">
          <div className="flex items-center">
            <ThumbsUp className="h-3 w-3 mr-1" />
            {video.viewsCount} views
          </div>
          <div className="flex items-center ml-3">
            <Clock className="h-3 w-3 mr-1" />
            {video.duration}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
