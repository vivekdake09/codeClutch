import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileVideo, Users, Play } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          icon={<FileVideo className="h-6 w-6" />}
          title="Total Videos"
          value="24"
          description="Videos in library"
        />
        <StatsCard
          icon={<Users className="h-6 w-6" />}
          title="Active Users"
          value="142"
          description="Users this month"
        />
        <StatsCard
          icon={<Play className="h-6 w-6" />}
          title="Total Views"
          value="3,287"
          description="Video views this month"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>Latest videos added to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Introduction to React", duration: "12:34", date: "2 days ago" },
                { title: "Advanced CSS Techniques", duration: "24:18", date: "5 days ago" },
                { title: "JavaScript Fundamentals", duration: "18:45", date: "1 week ago" },
              ].map((video, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{video.title}</p>
                    <p className="text-sm text-muted-foreground">{video.duration}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{video.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Videos</CardTitle>
            <CardDescription>Most viewed videos this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "React Hooks Tutorial", views: "1,245", duration: "15:22" },
                { title: "Building a REST API", views: "982", duration: "22:10" },
                { title: "CSS Grid Layout", views: "876", duration: "10:05" },
              ].map((video, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <p className="font-medium">{video.title}</p>
                    <p className="text-sm text-muted-foreground">{video.duration}</p>
                  </div>
                  <span className="text-sm font-medium">{video.views} views</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({ icon, title, value, description }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

