"use client"

import { useState } from "react"
import { MoreHorizontal, Play, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Video } from "@/components/admin-dashboard"

interface VideoListProps {
  videos: Video[]
  onVideosChanged: (videos: Video[]) => void
}

export function VideoList({ videos, onVideosChanged }: VideoListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null)

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleEdit = (video: Video) => {
    setSelectedVideo(video)
    setEditTitle(video.title)
    setEditDescription(video.description || "")
    setIsEditDialogOpen(true)
  }

  const handleDelete = (video: Video) => {
    setSelectedVideo(video)
    setIsDeleteDialogOpen(true)
  }

  const handlePreview = (video: Video) => {
    setPreviewVideo(video)
  }

  const confirmEdit = () => {
    if (!selectedVideo) return

    const updatedVideos = videos.map((video) =>
      video.id === selectedVideo.id ? { ...video, title: editTitle, description: editDescription } : video,
    )

    onVideosChanged(updatedVideos)
    setIsEditDialogOpen(false)
  }

  const confirmDelete = () => {
    if (!selectedVideo) return

    const updatedVideos = videos.filter((video) => video.id !== selectedVideo.id)
    onVideosChanged(updatedVideos)
    setIsDeleteDialogOpen(false)

    // Close preview if the deleted video was being previewed
    if (previewVideo && previewVideo.id === selectedVideo.id) {
      setPreviewVideo(null)
    }
  }

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
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search videos..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredVideos.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">No videos found</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative aspect-video cursor-pointer group" onClick={() => handlePreview(video)}>
                <img
                  src={video.thumbnail || "/placeholder.svg?height=180&width=320"}
                  alt={video.title}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-medium line-clamp-1">{video.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">Uploaded on {formatDate(video.uploadDate)}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handlePreview(video)}>
                        <Play className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(video)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(video)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {video.description && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{video.description}</p>
                )}
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <div className="text-xs text-muted-foreground">
                  {video.sequence !== undefined ? `Sequence: ${video.sequence}` : "Unsequenced"}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>Make changes to your video details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input id="edit-title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Video</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this video? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Video Preview Dialog */}
      <Dialog open={!!previewVideo} onOpenChange={(open) => !open && setPreviewVideo(null)}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{previewVideo?.title}</DialogTitle>
          </DialogHeader>
          {previewVideo && (
            <div className="space-y-4">
              <div className="aspect-video overflow-hidden rounded-md">
                <video src={previewVideo.url} controls className="w-full h-full" poster={previewVideo.thumbnail}>
                  Your browser does not support the video tag.
                </video>
              </div>
              {previewVideo.description && (
                <div>
                  <h4 className="text-sm font-medium">Description:</h4>
                  <p className="text-sm text-muted-foreground mt-1">{previewVideo.description}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

