import type { Metadata } from "next"
import AdminDashboard from "@/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Video Admin Dashboard",
  description: "Upload and sequence videos in your admin panel",
}

export default function HomePage() {
  return <AdminDashboard />
}

