"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, FileVideo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Video } from "@/components/admin-dashboard"

interface VideoUploaderProps {
  onVideoUploaded: (video: Video) => void
}

export function VideoUploader({ onVideoUploaded }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("video/")) {
        setSelectedFile(file)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  const clearSelectedFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !title) return

    setIsUploading(true)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 200)

    // Simulate API call with a delay
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      // Create a new video object
      const newVideo: Video = {
        id: Date.now().toString(),
        title,
        description,
        url: URL.createObjectURL(selectedFile),
        uploadDate: new Date(),
        thumbnail: "/placeholder.svg?height=180&width=320",
        duration: 120, // Placeholder duration in seconds
      }

      onVideoUploaded(newVideo)

      // Reset form
      setSelectedFile(null)
      setTitle("")
      setDescription("")
      setIsUploading(false)
      setUploadProgress(0)

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Video</CardTitle>
        <CardDescription>Drag and drop your video file or click to browse</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/25"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          {selectedFile ? (
            <div className="flex flex-col items-center gap-2">
              <FileVideo className="h-10 w-10 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{selectedFile.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation()
                    clearSelectedFile()
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-xs text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <span className="text-sm font-medium">Drag and drop your video here</span>
              <span className="text-xs text-muted-foreground">Supports MP4, WebM, and MOV formats up to 500MB</span>
            </div>
          )}
          <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={handleFileSelect} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
            disabled={isUploading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description (optional)"
            disabled={isUploading}
            rows={3}
          />
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Uploading: {uploadProgress}%</div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!selectedFile || !title || isUploading} className="w-full">
          {isUploading ? "Uploading..." : "Upload Video"}
        </Button>
      </CardFooter>
    </Card>
  )
}

