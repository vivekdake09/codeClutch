"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Play, Pause, Save, Plus, Trash2, GripVertical } from "lucide-react"

// Mock data for video clips
const initialClips = [
  {
    id: "clip-1",
    title: "Intro Sequence",
    duration: 15,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "clip-2",
    title: "Main Content",
    duration: 45,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: "clip-3",
    title: "Closing Remarks",
    duration: 20,
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
]

export default function VideoSequencer() {
  const [clips, setClips] = useState(initialClips)
  const [currentClip, setCurrentClip] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sequenceName, setSequenceName] = useState("New Sequence")
  const videoRef = useRef(null)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(clips)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setClips(items)
  }

  const playClip = (clip) => {
    setCurrentClip(clip)
    setIsPlaying(true)

    if (videoRef.current) {
      videoRef.current.src = clip.src
      videoRef.current.play()
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const addNewClip = () => {
    const newClip = {
      id: `clip-${clips.length + 1}-${Date.now()}`,
      title: `New Clip ${clips.length + 1}`,
      duration: 10,
      src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    }

    setClips([...clips, newClip])
  }

  const removeClip = (clipId) => {
    setClips(clips.filter((clip) => clip.id !== clipId))

    if (currentClip && currentClip.id === clipId) {
      setCurrentClip(null)
      setIsPlaying(false)
      if (videoRef.current) {
        videoRef.current.pause()
      }
    }
  }

  const saveSequence = () => {
    // In a real app, you would save the sequence to your backend
    console.log("Saving sequence:", { name: sequenceName, clips })
    alert("Sequence saved successfully!")
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const totalDuration = clips.reduce((total, clip) => total + clip.duration, 0)

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Video Sequencer</h2>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>Preview the selected video clip</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black rounded-md overflow-hidden">
                {currentClip ? (
                  <video
                    ref={videoRef}
                    className="w-full h-full"
                    src={currentClip.src}
                    controls={false}
                    onEnded={() => setIsPlaying(false)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <p>Select a clip to preview</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>{currentClip && <p className="font-medium">{currentClip.title}</p>}</div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon" disabled={!currentClip} onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sequence Details</CardTitle>
              <CardDescription>Name your sequence and save it</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sequence-name">Sequence Name</Label>
                  <Input id="sequence-name" value={sequenceName} onChange={(e) => setSequenceName(e.target.value)} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Duration</p>
                    <p className="font-medium">{formatDuration(totalDuration)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Clips</p>
                    <p className="font-medium">{clips.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveSequence} className="w-full">
                <Save className="mr-2 h-4 w-4" />
                Save Sequence
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Clip Sequence</CardTitle>
                  <CardDescription>Drag and drop to reorder clips</CardDescription>
                </div>
                <Button size="sm" onClick={addNewClip}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Clip
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="clips">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {clips.map((clip, index) => (
                        <Draggable key={clip.id} draggableId={clip.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center space-x-2 border rounded-md p-3 bg-card"
                            >
                              <div {...provided.dragHandleProps} className="cursor-move">
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{clip.title}</p>
                                <p className="text-sm text-muted-foreground">{formatDuration(clip.duration)}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => playClip(clip)}>
                                  <Play className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => removeClip(clip.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              {clips.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No clips added yet</p>
                  <p className="text-sm">Click "Add Clip" to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

