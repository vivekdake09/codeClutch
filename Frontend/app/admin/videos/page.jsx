"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MoreVertical, Play, Edit, Trash, Eye } from "lucide-react"

// Mock data for videos
const mockVideos = [
  {
    id: 1,
    title: "Getting Started with React",
    duration: "12:34",
    views: 1245,
    date: "2023-10-15",
    status: "published",
  },
  { id: 2, title: "Advanced CSS Techniques", duration: "24:18", views: 982, date: "2023-10-10", status: "published" },
  { id: 3, title: "JavaScript Fundamentals", duration: "18:45", views: 876, date: "2023-10-05", status: "published" },
  { id: 4, title: "Building a REST API", duration: "22:10", views: 543, date: "2023-09-28", status: "published" },
  { id: 5, title: "Introduction to TypeScript", duration: "15:22", views: 421, date: "2023-09-20", status: "draft" },
  { id: 6, title: "React Hooks Tutorial", duration: "20:15", views: 312, date: "2023-09-15", status: "published" },
  { id: 7, title: "CSS Grid Layout", duration: "10:05", views: 287, date: "2023-09-10", status: "published" },
  { id: 8, title: "Node.js Basics", duration: "16:40", views: 198, date: "2023-09-05", status: "draft" },
]

export default function ManageVideos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [videos, setVideos] = useState(mockVideos)

  const filteredVideos = videos.filter((video) => video.title.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleDelete = (id) => {
    setVideos(videos.filter((video) => video.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Manage Videos</h2>
        <Button>Add New Video</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Video Library</CardTitle>
          <CardDescription>Manage and organize your video content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search videos..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium">{video.title}</TableCell>
                      <TableCell>{video.duration}</TableCell>
                      <TableCell>{video.views.toLocaleString()}</TableCell>
                      <TableCell>{new Date(video.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            video.status === "published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Play className="mr-2 h-4 w-4" />
                              <span>Play</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              <span>View Stats</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer text-destructive focus:text-destructive"
                              onClick={() => handleDelete(video.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      No videos found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

