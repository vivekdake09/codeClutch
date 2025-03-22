"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Check, FileVideo } from "lucide-react"

export default function VideoUpload() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file)
      setUploadComplete(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedFile) return

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setUploading(false)
          setUploadComplete(true)
          return 100
        }
        return newProgress
      })
    }, 500)

    // In a real application, you would use FormData and fetch/axios to upload the file
    // const formData = new FormData()
    // formData.append('video', selectedFile)
    // fetch('/api/upload', { method: 'POST', body: formData })
  }

  const resetForm = () => {
    setSelectedFile(null)
    setUploadProgress(0)
    setUploadComplete(false)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Upload Video</h2>

      <Card>
        <CardHeader>
          <CardTitle>Video Upload</CardTitle>
          <CardDescription>Upload a new video to your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Video Title</Label>
              <Input id="title" placeholder="Enter video title" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter video description" rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Video File</Label>
              {!selectedFile ? (
                <div
                  className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => document.getElementById("video-upload").click()}
                >
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground mt-1">MP4, WebM or AVI (max. 2GB)</p>
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <FilePreview file={selectedFile} />
                      <div>
                        <p className="font-medium truncate">{selectedFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={resetForm} disabled={uploading}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {(uploading || uploadComplete) && (
                    <div className="mt-2">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${uploadComplete ? "bg-green-500" : "bg-primary"}`}
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>{uploadComplete ? "Complete" : `${uploadProgress}%`}</span>
                        {uploadComplete && <Check className="h-4 w-4 text-green-500" />}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="Enter tags separated by commas" />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetForm} disabled={uploading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedFile || uploading || uploadComplete}>
            {uploading ? "Uploading..." : uploadComplete ? "Uploaded" : "Upload Video"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function FilePreview({ file }) {
  return (
    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
      <FileVideo className="h-5 w-5 text-muted-foreground" />
    </div>
  )
}

