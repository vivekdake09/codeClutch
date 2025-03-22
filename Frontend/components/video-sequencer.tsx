"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { GripVertical, Play, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Video } from "@/components/admin-dashboard"
import { toast } from "sonner"

interface VideoSequencerProps {
  videos: Video[]
  onSequenceUpdated: (videos: Video[]) => void
}

export function VideoSequencer({ videos, onSequenceUpdated }: VideoSequencerProps) {
  const [sequencedVideos, setSequencedVideos] = useState<Video[]>([])
  const [previewVideo, setPreviewVideo] = useState<Video | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // Initialize sequenced videos with sequence numbers if they don't have them
    const initialSequenced = [...videos].map((video, index) => ({
      ...video,
      sequence: video.sequence !== undefined ? video.sequence : index + 1,
    }))

    // Sort by sequence number
    initialSequenced.sort((a, b) => {
      const seqA = a.sequence !== undefined ? a.sequence : Number.MAX_SAFE_INTEGER
      const seqB = b.sequence !== undefined ? b.sequence : Number.MAX_SAFE_INTEGER
      return seqA - seqB
    })

    setSequencedVideos(initialSequenced)
  }, [videos])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(sequencedVideos)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update sequence numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      sequence: index + 1,
    }))

    setSequencedVideos(updatedItems)
    setHasChanges(true)
  }

  const handleSaveSequence = () => {
    onSequenceUpdated(sequencedVideos)
    setHasChanges(false)
    toast.success("Video sequence saved successfully")
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "00:00"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Arrange Videos in Sequence</h3>
        <Button onClick={handleSaveSequence} disabled={!hasChanges} className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          Save Sequence
        </Button>
      </div>

      {sequencedVideos.length === 0 ? (
        <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">No videos available to sequence</p>
          </div>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="videos">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {sequencedVideos.map((video, index) => (
                  <Draggable key={video.id} draggableId={video.id} index={index}>
                    {(provided) => (
                      <Card ref={provided.innerRef} {...provided.draggableProps} className="border">
                        <CardContent className="p-0">
                          <div className="flex items-center p-2">
                            <div {...provided.dragHandleProps} className="px-2 cursor-grab">
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-muted rounded-md mr-3">
                              <span className="text-lg font-bold">{index + 1}</span>
                            </div>
                            <div
                              className="relative flex-shrink-0 w-24 h-16 mr-3 cursor-pointer"
                              onClick={() => setPreviewVideo(video)}
                            >
                              <img
                                src={video.thumbnail || "/placeholder.svg?height=180&width=320"}
                                alt={video.title}
                                className="object-cover w-full h-full rounded-md"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-md">
                                <Play className="h-6 w-6 text-white" />
                              </div>
                            </div>
                            <div className="flex-grow min-w-0">
                              <h4 className="font-medium truncate">{video.title}</h4>
                              {video.description && (
                                <p className="text-xs text-muted-foreground truncate">{video.description}</p>
                              )}
                            </div>
                            <div className="flex-shrink-0 text-xs text-muted-foreground ml-2">
                              {formatDuration(video.duration)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

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

// Import Dialog components
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

