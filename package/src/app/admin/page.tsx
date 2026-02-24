"use client";
import { useEffect, useState } from "react";
import { 
  IconUsers, 
  IconBriefcase, 
  IconBuilding, 
  IconCalendar,
  IconCurrencyNaira,
  IconTrendingUp,
  IconActivity,
  IconUserPlus,
  IconLogin
} from "@tabler/icons-react";
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsersToday: 0,
    activeSessions: 0,
    totalRevenue: 0,
    jobsPosted: 0,
    hotelBookings: 0
  });

  // Sample data - replace with API calls
  const userGrowthData = [
    { month: 'Jan', users: 400 },
    { month: 'Feb', users: 600 },
    { month: 'Mar', users: 800 },
    { month: 'Apr', users: 1200 },
    { month: 'May', users: 1800 },
    { month: 'Jun', users: 2400 },
  ];

  const serviceDistribution = [
    { name: 'E-jobs', value: 45, color: '#3B82F6' },
    { name: 'Hotels', value: 30, color: '#10B981' },
    { name: 'Companion', value: 15, color: '#8B5CF6' },
    { name: 'Venue', value: 10, color: '#EC4899' },
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'Registered', time: '2 min ago', icon: IconUserPlus },
    { id: 2, user: 'Jane Smith', action: 'Logged in', time: '15 min ago', icon: IconLogin },
    { id: 3, user: 'Acme Corp', action: 'Posted a job', time: '1 hour ago', icon: IconBriefcase },
    { id: 4, user: 'Traveler123', action: 'Booked hotel', time: '3 hours ago', icon: IconBuilding },
  ];

  useEffect(() => {
    // Fetch real data from API
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:8000/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back, manage your platform</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Cards with Animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Users" 
          value="2,847" 
          change="+12.5%"
          icon={IconUsers}
          color="blue"
        />
        <StatCard 
          title="Revenue" 
          value="₦8.5M" 
          change="+23.1%"
          icon={IconCurrencyNaira}
          color="green"
        />
        <StatCard 
          title="Active Jobs" 
          value="1,245" 
          change="+8.2%"
          icon={IconBriefcase}
          color="purple"
        />
        <StatCard 
          title="Hotel Bookings" 
          value="3,450" 
          change="+15.3%"
          icon={IconBuilding}
          color="amber"
        />
        <StatCard 
          title="Venue Bookings" 
          value="456" 
          change="+22.1%"
          icon={IconCalendar}
          color="pink"
        />
        <StatCard 
          title="Active Sessions" 
          value="1,234" 
          change="+5.7%"
          icon={IconActivity}
          color="indigo"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#3B82F6" fill="#93C5FD" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Service Distribution */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Revenue by Service</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
               label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              >
                {serviceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                <activity.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.user}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{activity.action}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Stat Card Component with Animation
function StatCard({ title, value, change, icon: Icon, color }: any) {
  const colors: any = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/30',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30',
    pink: 'bg-pink-50 text-pink-600 dark:bg-pink-900/30',
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium text-green-600">{change}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
      <p className="text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}