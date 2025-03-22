import Link from "next/link"
import { Home, Upload, Play, List } from "lucide-react"

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-muted h-screen p-4 border-r">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Video Platform</h2>
        <p className="text-sm text-muted-foreground">Admin Panel</p>
      </div>

      <nav className="space-y-1">
        <SidebarLink href="/admin" icon={<Home size={20} />} label="Dashboard" />
        <SidebarLink href="/admin/upload" icon={<Upload size={20} />} label="Upload Videos" />
        <SidebarLink href="/admin/videos" icon={<Play size={20} />} label="Manage Videos" />
        <SidebarLink href="/admin/sequencer" icon={<List size={20} />} label="Video Sequencer" />
      </nav>
    </div>
  )
}

function SidebarLink({ href, icon, label }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors">
      {icon}
      <span>{label}</span>
    </Link>
  )
}

