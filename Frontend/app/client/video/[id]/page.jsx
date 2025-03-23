"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, Maximize, ThumbsUp, MessageSquare, Share2 } from "lucide-react";

export default function VideoPage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoDetails, setVideoDetails] = useState(null);
  const [likes, setLikes] = useState(0); // Add state for likes

  const { id } = useParams();
  // console.log("Extracted video ID:", id); 

  useEffect(() => {
    if (!id) return;
    // console.log("Fetching video for ID:", id);

    fetch(`http://localhost:8080/videos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched video data:", data);
        setVideoDetails(data);
      })
      .catch((err) => console.error("Error fetching video:", err));
  }, [id]);

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoDetails?.videoUrl) {
      const handleLoadedMetadata = () => setDuration(video.duration || 0);
      const updateTime = () => {
        setCurrentTime(video.currentTime);
        setDuration(video.duration || 0);
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", updateTime);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [videoDetails?.videoUrl]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

 const handleLike = async () => {
  if (!videoDetails) return;

  // Optimistically update the UI first
  setVideoDetails((prevDetails) => ({
    ...prevDetails,
    likesCount: (prevDetails.likesCount || 0) + 1, // Ensure it doesn't break on undefined
  }));

  try {
    // Send request to backend
    const res = await fetch(`http://localhost:8080/videos/${id}/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Failed to like the video");

    const data = await res.json();

    // Update state with the latest value from the backend
    setVideoDetails((prevDetails) => ({
      ...prevDetails,
      likesCount: data.likesCount, // Use actual backend count to keep it in sync
    }));
  } catch (err) {
    console.error("Error liking video:", err);

    // Revert UI if API call fails
    setVideoDetails((prevDetails) => ({
      ...prevDetails,
      likesCount: (prevDetails.likesCount || 1) - 1, // Revert on failure
    }));
  }
};


  const enterFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative bg-black rounded-lg overflow-hidden">
            {videoDetails && (
              <video
                ref={videoRef}
                src={videoDetails.videoUrl}
                className="w-full aspect-video"
                onLoadedMetadata={(e) => setDuration(e.target.duration || 0)}
                onClick={togglePlay}
                onEnded={() => setIsPlaying(false)}
              />
            )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              {/* Grouped Play, Mute, and Duration Together */}
              <div className="flex items-center gap-x-4">
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

              {/* Fullscreen Button Stays on the Right */}
              <Button variant="ghost" size="icon" className="text-white" onClick={enterFullscreen}>
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>


          </div>

          {videoDetails && (
            <div>
              <h1 className="text-2xl font-bold">{videoDetails.title}</h1>
              <div className="text-sm text-muted-foreground">
                {videoDetails.viewsCount} views
              </div>
              <div className="flex space-x-2 mt-2">
                <Button variant="ghost" size="sm" className="flex items-center" onClick={handleLike}>
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {videoDetails?.likesCount || 0}
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
          )}
        </div>
      </div>
    </div>
  );
}
