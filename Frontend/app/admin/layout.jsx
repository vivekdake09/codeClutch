import { redirect } from "next/navigation"
import AdminSidebar from "./components/admin-sidebar"

// This is a placeholder for authentication
// In a real app, you would implement proper authentication
const isAuthenticated = () => {
  // Replace with actual authentication logic
  return true
}

export default function AdminLayout({ children }) {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">{children}</main>
      </div>
    </div>
  )
}

