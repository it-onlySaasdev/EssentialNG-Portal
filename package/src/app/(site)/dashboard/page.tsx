"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  IconBriefcase, 
  IconBuilding, 
  IconUsers, 
  IconCalendar, 
  IconLogout, 
  IconUser, 
  IconSettings, 
  IconChevronDown,
  IconBell,
  IconSearch,
  IconMoon,
  IconSun,
  IconCreditCard,
  IconChartBar,
  IconMessage,
  IconFileText,
  IconHelp,
  IconShield,
  IconStar,
  IconClock,
  IconActivity,
  IconArrowUpRight,
  IconArrowDownRight,
  IconDotsVertical,
  IconRefresh,
  IconWallet,
  IconDashboard
} from "@tabler/icons-react";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [pathUrl, setPathUrl] = useState("");
  const [theme, setTheme] = useState("light");
  
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const signInRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Simple Logo component
  const Logo = () => (
    <div className="text-2xl font-bold text-primary dark:text-white">
      Essential<span className="text-blue-600">NG</span>
    </div>
  );

  // Simple HeaderLink component
  const HeaderLink = ({ item }: { item: { label: string; path: string } }) => (
    <Link href={item.path} className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary">
      {item.label}
    </Link>
  );

  // Simple MobileHeaderLink component
  const MobileHeaderLink = ({ item }: { item: { label: string; path: string } }) => (
    <Link href={item.path} className="w-full py-2 text-gray-700 dark:text-gray-300 hover:text-primary">
      {item.label}
    </Link>
  );

  // Simple SearchBar component
  const SearchBar = () => (
    <div className="relative">
      <input
        type="text"
        placeholder="Quick Search..."
        className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      />
      <IconSearch className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
    </div>
  );

  // Sample header data
  const headerData = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Our Products", path: "/products" },
    { label: "Blog", path: "/blog" },
    { label: "contact us", path: "/contact" },
    { label: "Documentation", path: "/docs" },
  ];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    
    if (!userData) {
      router.push("/login");
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
    } catch (e) {
      console.error("Error parsing user data:", e);
      router.push("/login");
      return;
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      }));
    };
    
    updateTime();
    const timer = setInterval(updateTime, 1000);
    
    return () => clearInterval(timer);
  }, [router]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = async () => {
    try {
      setIsRefreshing(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setShowDropdown(false);
  };

  const handleSettingsClick = () => {
    router.push("/settings");
    setShowDropdown(false);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  // Sample activity data
  const recentActivities = [
    { id: 1, action: "Job Application Submitted", service: "E-jobs", time: "5 min ago", icon: IconBriefcase, color: "blue" },
    { id: 2, action: "Hotel Booking Confirmed", service: "E-Budgethotel", time: "2 hours ago", icon: IconBuilding, color: "green" },
    { id: 3, action: "Companion Request Accepted", service: "E-Companion", time: "1 day ago", icon: IconUsers, color: "purple" },
    { id: 4, action: "Venue Inquiry Response", service: "E-Venue", time: "2 days ago", icon: IconCalendar, color: "pink" },
  ];

  // Sample stats data
  const stats = [
    { 
      label: "Total Jobs", 
      value: "24", 
      change: "+12%", 
      trend: "up", 
      icon: IconBriefcase,
      color: "blue",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    { 
      label: "Bookings", 
      value: "8", 
      change: "+5%", 
      trend: "up", 
      icon: IconBuilding,
      color: "green",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400"
    },
    { 
      label: "Earnings", 
      value: "₦45.2K", 
      change: "+23%", 
      trend: "up", 
      icon: IconWallet,
      color: "purple",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400"
    },
    { 
      label: "Rating", 
      value: "4.8", 
      change: "+0.3", 
      trend: "up", 
      icon: IconStar,
      color: "amber",
      bgColor: "bg-amber-50 dark:bg-amber-900/20",
      textColor: "text-amber-600 dark:text-amber-400"
    },
  ];

  // Services overview data
  const servicesOverview = [
    { name: "E-jobs", icon: IconBriefcase, color: "blue", progress: 75 },
    { name: "E-Budgethotel", icon: IconBuilding, color: "green", progress: 60 },
    { name: "E-Companion", icon: IconUsers, color: "purple", progress: 45 },
    { name: "E-Venue", icon: IconCalendar, color: "pink", progress: 30 },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center transform transition-all duration-500 animate-fade-in">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
            <div className="relative w-20 h-20 border-4 border-blue-500/30 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 font-medium animate-pulse">
            Preparing your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Dashboard Navigation - ALWAYS VISIBLE */}
      {/* Dashboard Navigation - STICKY TOP with Mobile Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo with animation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">E</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    Essential<span className="text-blue-600 dark:text-blue-400">NG</span>
                  </h1>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Client Portal</span>
                </div>
              </div>

              {/* Desktop Navigation Tabs */}
              <div className="hidden md:flex items-center space-x-1">
                {['overview', 'services', 'analytics', 'messages'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize
                      ${activeTab === tab 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Bar - Desktop */}
              <div className="hidden lg:flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1.5">
                <IconSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none text-sm px-2 w-48 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {darkMode ? (
                  <IconSun className="w-5 h-5 relative z-10" />
                ) : (
                  <IconMoon className="w-5 h-5 relative z-10" />
                )}
              </button>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
              >
                <IconRefresh className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <IconBell className="w-5 h-5 relative z-10" />
                {notifications > 0 && (
                  <>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </>
                )}
              </button>


              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm transform group-hover:scale-105 transition-transform duration-300">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.username}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{greeting}</p>
                  </div>
                  <IconChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Enhanced Dropdown Menu - FULL VERSION */}
                {showDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-40 animate-fade-in" 
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 z-50 overflow-hidden transform transition-all duration-300 animate-slide-down">
                      {/* User Info Header */}
                      <div className="p-5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-lg font-bold text-gray-900 dark:text-white truncate">
                              {user.username}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                              {user.email}
                            </p>
                            <div className="flex items-center mt-1 space-x-2">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                Online
                              </span>
                              <span className="text-xs text-gray-400 dark:text-gray-500">{currentTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-200/50 dark:border-gray-700/50">
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">12</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Jobs</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">5</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Bookings</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">₦45K</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Earned</p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <button
                          onClick={handleProfileClick}
                          className="w-full flex items-center px-5 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-200 group"
                        >
                          <div className="relative">
                            <IconUser className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                          </div>
                          <span className="flex-1 text-left">Your Profile</span>
                          <span className="text-xs text-gray-400">80%</span>
                        </button>

                        <button
                          onClick={handleSettingsClick}
                          className="w-full flex items-center px-5 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-200 group"
                        >
                          <IconSettings className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                          <span className="flex-1 text-left">Account Settings</span>
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">New</span>
                        </button>

                        <button
                          className="w-full flex items-center px-5 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-200 group"
                        >
                          <IconCreditCard className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                          <span className="flex-1 text-left">Billing</span>
                        </button>

                        <button
                          className="w-full flex items-center px-5 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-900/20 dark:hover:to-indigo-900/20 transition-all duration-200 group"
                        >
                          <IconShield className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                          <span className="flex-1 text-left">Security</span>
                        </button>

                        <div className="border-t border-gray-200/50 dark:border-gray-700/50 my-2"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-5 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 dark:hover:from-red-900/20 dark:hover:to-orange-900/20 transition-all duration-200 group"
                        >
                          <div className="relative">
                            <IconLogout className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                          </div>
                          <span className="flex-1 text-left font-medium">Sign Out</span>
                          <span className="text-xs text-gray-400">↵</span>
                        </button>
                      </div>

                      <div className="px-5 py-4 bg-gray-50/80 dark:bg-gray-900/80 border-t border-gray-200/50 dark:border-gray-700/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between">
                          <span>User ID: #{user.user_id}</span>
                          <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">v2.1.0</span>
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </nav>

      {/* MAIN SITE HEADER - HIDDEN ON DASHBOARD */}
      {!isDashboard && (
        <>
          {/* Secondary Top Navigation bar */}
          <div className="sm:bg-linear-to-r bg-linear-to-l md:from-primary md:to-secondary lg:py-0 py-2 bg-white dark:bg-dark">
            <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) flex items-center justify-between px-4">
              <div className="lg:hidden block">
                <Logo />
              </div>
              <nav className="hidden lg:flex grow items-center justify-start">
                {headerData.map((item, index) => (
                  <HeaderLink key={index} item={item} />
                ))}
              </nav>
              <div className="flex items-center space-x-4 relative top-[1px]">
                <button
                  aria-label="Toggle theme"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
                >
                  <svg
                    viewBox="0 0 16 16"
                    className={`hidden h-6 w-6 dark:block ${
                      !sticky && pathUrl === "/" && "text-white"
                    }`}
                  >
                    <path
                      d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 23 23"
                    className={`h-8 w-8 text-dark dark:hidden ${
                      !sticky && pathUrl === "/" && "text-white"
                    }`}
                  >
                    <path d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z" />
                  </svg>
                </button>

                {isSignInOpen && (
                  <div
                    ref={signInRef}
                    className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50 m-0!"
                  >
                    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-dark">
                      <button
                        onClick={() => setIsSignInOpen(false)}
                        className="hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute -top-5 -right-3 mr-8 mt-8"
                        aria-label="Close Sign In Modal"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          className="text-2xl dark:text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                      {/* Sign In Form Content */}
                      <h2 className="text-2xl font-bold mb-4 dark:text-white">Sign In</h2>
                      <form className="space-y-4">
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          className="w-full px-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        />
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                          Sign In
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                <Link
                  href="./register"
                  className="bg-primary text-white px-4 py-2 rounded-lg text-nowrap hover:bg-darkprimary"
                >
                  Get in Touch
                </Link>
                <button
                  onClick={() => setNavbarOpen(!navbarOpen)}
                  className="block lg:hidden p-2 rounded-lg"
                  aria-label="Toggle mobile menu"
                >
                  <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
                  <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
                  <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
                </button>
              </div>
            </div>

            {/* Mobile menu overlay */}
            {navbarOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40" />
            )}
            
            {/* Mobile menu */}
            <div
              ref={mobileMenuRef}
              className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-dark shadow-lg transform transition-transform duration-300 max-w-xs ${
                navbarOpen ? "translate-x-0" : "translate-x-full"
              } z-50`}
            >
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-bold text-midnight_text dark:text-white">
                  Menu
                </h2>
                <button
                  onClick={() => setNavbarOpen(false)}
                  aria-label="Close mobile menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="dark:text-white"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col items-start p-4">
                {headerData.map((item, index) => (
                  <MobileHeaderLink key={index} item={item} />
                ))}
                <div className="mt-4 flex flex-col space-y-4 w-full">
                  <Link
                    href="#"
                    className="bg-transparent border border-primary text-primary px-4 py-2 text-nowrap rounded-lg hover:bg-darkprimary hover:text-white"
                    onClick={() => {
                      setIsSignInOpen(true);
                      setNavbarOpen(false);
                    }}
                  >
                    Login 
                  </Link>
                  <Link
                    href="#"
                    className="bg-primary text-white px-4 py-2 rounded-lg text-nowrap hover:bg-darkprimary"
                    onClick={() => {
                      setIsSignUpOpen(true);
                      setNavbarOpen(false);
                    }}
                  >
                    Sign up for free
                  </Link>
                </div>
              </nav>
            </div>
          </div>

          {/* Low header */}
          <div className="bg-white backdrop-blur-md dark:bg-dark/40 shadow-sm sticky top-0 z-50">
            <div className="px-4 container mx-auto max-w-screen-xl sm:flex lg:justify-between justify-center py-5 hidden">
              {/* Logo Section */}
              <div className="lg:block hidden">
                <div className="text-2xl font-bold text-primary dark:text-white tracking-wider">
                  ESSENTIAL<span className="text-error">NG</span>
                </div>
              </div>

              {/* Contact Info + Search */}
              <div className="flex items-center">
                {/* Email */}
                <div className="flex gap-3 py-2 pr-6 border-r dark:border-dark_border">
                  <Image
                    src="/images/icons/icon-mail.svg"
                    alt="icon"
                    width={32}
                    height={32}
                  />
                  <div>
                    <p className="text-sm text-muted dark:text-white/60 mb-0">
                      Email us at
                    </p>
                    <Link
                      href="#"
                      className="text-base font-semibold hover:text-primary"
                    >
                      idowu.tobi.saas.dev@gmail.com
                    </Link>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-3 py-2 pl-6">
                  <Image
                    src="/images/icons/icon-phone.svg"
                    alt="icon"
                    width={32}
                    height={32}
                  />
                  <div>
                    <p className="text-sm text-muted dark:text-white/60 mb-0">
                      Call us now
                    </p>
                    <Link
                      href="#"
                      className="text-base font-semibold hover:text-primary"
                    >
                      816 (501) 6737
                    </Link>
                  </div>
                </div>

                <div className="ml-8">
                  <SearchBar />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section with Animation */}
        <div className="mb-8 transform transition-all duration-500 animate-slide-up">
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
            <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]"></div>
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-black/20 rounded-full blur-3xl"></div>
            
            <div className="relative px-8 py-12 sm:px-12 sm:py-16">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="text-center lg:text-left mb-8 lg:mb-0">
                  <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    {greeting}, {user.username}!
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Welcome to Your Dashboard
                  </h1>
                  <p className="text-xl text-white/90 max-w-2xl">
                    Manage your services, track your progress, and grow your business with EssentialNG.
                  </p>
                  <div className="flex flex-wrap gap-4 mt-8">
                    <button className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      Get Started
                    </button>
                    <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transform hover:scale-105 transition-all duration-300">
                      Watch Demo
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <div className="relative grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <p className="text-3xl font-bold text-white">24</p>
                      <p className="text-sm text-white/80">Active Jobs</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <p className="text-3xl font-bold text-white">8</p>
                      <p className="text-sm text-white/80">Bookings</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid with Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-[1.02] transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
                <div className="flex items-center space-x-1">
                  <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                  {stat.trend === 'up' ? (
                    <IconArrowUpRight className="w-4 h-4 text-green-600" />
                  ) : (
                    <IconArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  vs last month
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 overflow-hidden transform transition-all duration-300 hover:shadow-xl animate-slide-up">
            <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <IconActivity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Recent Activity
                  </h2>
                </div>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium flex items-center">
                  View All
                  <IconArrowUpRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {recentActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`p-3 rounded-xl bg-${activity.color}-100 dark:bg-${activity.color}-900/30 mr-4 group-hover:scale-110 transition-transform duration-300`}>
                    <activity.icon className={`w-5 h-5 text-${activity.color}-600 dark:text-${activity.color}-400`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {activity.action}
                    </h4>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-400">
                        {activity.service}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <IconClock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </span>
                    </div>
                  </div>
                  <IconDotsVertical className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Services Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 transform transition-all duration-300 hover:shadow-xl animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <IconBriefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Services Overview
                  </h2>
                </div>
              </div>
              <div className="space-y-4">
                {servicesOverview.map((service, index) => (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <service.icon className={`w-4 h-4 text-${service.color}-600 dark:text-${service.color}-400`} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {service.name}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {service.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`bg-${service.color}-500 dark:bg-${service.color}-400 h-2 rounded-full transition-all duration-500 group-hover:scale-x-105 origin-left`}
                        style={{ width: `${service.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 transform transition-all duration-300 hover:shadow-xl animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <IconDashboard className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    Quick Actions
                  </h2>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 group transition-all duration-300 hover:scale-[1.02]">
                  <IconBriefcase className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-white mx-auto mb-2 transition-colors duration-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">
                    Post Job
                  </span>
                </button>
                <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-green-500 hover:to-teal-500 group transition-all duration-300 hover:scale-[1.02]">
                  <IconBuilding className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-white mx-auto mb-2 transition-colors duration-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">
                    Book Hotel
                  </span>
                </button>
                <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 group transition-all duration-300 hover:scale-[1.02]">
                  <IconUsers className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-white mx-auto mb-2 transition-colors duration-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">
                    Find Companion
                  </span>
                </button>
                <button className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 group transition-all duration-300 hover:scale-[1.02]">
                  <IconCalendar className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-white mx-auto mb-2 transition-colors duration-300" />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 group-hover:text-white">
                    Book Venue
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message with Animation */}
        <div className="relative mt-8 group animate-slide-up">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full blur animate-pulse"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Authentication System Ready
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your dashboard is fully functional with secure authentication
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Backend: FastAPI (8000)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Frontend: Next.js (3000)
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MAIN SITE FOOTER - HIDDEN ON DASHBOARD */}
      {!isDashboard && (
        <footer className="relative mt-16 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">E</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  EssentialNG Portal © {new Date().getFullYear()}
                </span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Help Center
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 dark:text-gray-600">v2.1.0</span>
                <span className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"></span>
                <span className="text-xs text-gray-400 dark:text-gray-600">Secure Connection</span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Dashboard Footer - ALWAYS VISIBLE */}
      <footer className="relative mt-16 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">E</span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                EssentialNG Portal © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Help Center
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400 dark:text-gray-600">v2.1.0</span>
              <span className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full"></span>
              <span className="text-xs text-gray-400 dark:text-gray-600">Secure Connection</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .bg-grid-white {
          background-image: linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
}