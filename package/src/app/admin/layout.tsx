"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  IconDashboard, 
  IconUsers, 
  IconBriefcase, 
  IconBuilding, 
  IconCalendar, 
  IconChartBar,
  IconSettings,
  IconLogout,
  IconMenu2,
  IconX
} from "@tabler/icons-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    
    const parsedUser = JSON.parse(userData);
    if (!parsedUser.is_admin) {
      router.push("/dashboard");
      return;
    }
    
    setUser(parsedUser);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const menuItems = [
    { icon: IconDashboard, label: "Overview", href: "/admin" },
    { icon: IconUsers, label: "Users", href: "/admin/users" },
    { icon: IconBriefcase, label: "E-jobs", href: "/admin/ejobs" },
    { icon: IconBuilding, label: "Hotels", href: "/admin/hotels" },
    { icon: IconCalendar, label: "Venues", href: "/admin/venues" },
    { icon: IconChartBar, label: "Analytics", href: "/admin/analytics" },
    { icon: IconSettings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow"
      >
        {sidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="h-full w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="p-6">
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Essential<span className="text-blue-600 dark:text-blue-400">NG</span>
            </h1>
            <span className="text-xs text-gray-500 dark:text-gray-400">Admin Portal</span>
          </div>

          <nav className="mt-6">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="absolute bottom-0 w-full p-4 border-t dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{user.username}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                <IconLogout size={20} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`lg:ml-64 p-6 transition-all duration-300 ${
        sidebarOpen ? 'ml-64' : 'ml-0'
      }`}>
        {children}
      </main>
    </div>
  );
}