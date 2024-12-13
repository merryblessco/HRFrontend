/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3BottomLeftIcon,
  BoltIcon,
  CalendarDateRangeIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentCurrencyDollarIcon,
  HomeIcon,
  UserPlusIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NotificationButton from "../../components/ui/NotificationButton";
import { clearSession, getSession } from "../../utils/sessionManager";
import LogoutButton from "../../components/ui/LogoutButton";

// Define types for navigation items
type SubmenuItem = {
  name: string;
  href: string;
};

type NavigationItem = {
  name: string;
  href: string;
  icon: any;
  current: boolean;
  submenu?: SubmenuItem[];
};

type UserNavigationItem = {
  name: string;
  href: string;
};

const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },

  {
    name: "Recruitment",
    href: "#",
    icon: UserPlusIcon,
    current: false,
    submenu: [
      { name: "Job Postings", href: "onboarding/job-postings" },
      { name: "Applications", href: "onboarding/applications" },
      { name: "Interviews", href: "onboarding/interviews" },
      // { name: "Interview Scheduling", href: "onboarding/interview-scheduling" },
      //{ name: "Onboarding Workflows", href: "onboarding/onboarding-workflows" },
      { name: "Onboarding Process", href: "onboarding/onboarding-process" },
    ],
  },
  {
    name: "Employee",
    href: "#",
    icon: UsersIcon,
    current: false,
    submenu: [
      { name: "All Employees", href: "/employees/all" },
      { name: "Add Employee", href: "/employees/add" },
      // { name: "Job History", href: "/employees/job-history" },
      { name: "Documents", href: "/employees/documents" },
    ],
  },
  {
    name: "Time & Attendance",
    href: "#",
    icon: CalendarDateRangeIcon,
    current: false,
    submenu: [
      { name: "Time Tracking", href: "attendance/time-tracking" },
      { name: "Attendance Records", href: "attendance/attendance-records" },
      { name: "Leave Management", href: "attendance/leave-management" },
      { name: "Overtime Management", href: "attendance/overtime-management" },
      { name: "Attendance Reports", href: "attendance/attendance-reports" },
    ],
  },
  {
    name: "Payroll Management",
    href: "#",
    icon: CurrencyDollarIcon,
    current: false,
    submenu: [
      { name: "Salary Calculation", href: "payroll/salary-calculation" },
      { name: "Payslip Generation", href: "payroll/payslip-generation" },
      { name: "Tax Management", href: "payroll/tax-management" },
      {
        name: "Benefits Administration",
        href: "payroll/benefits-administration",
      },
      { name: "Insurance Management", href: "payroll/insurance-management" },
      { name: "Payroll Compliance", href: "payroll/payroll-compliance" },
    ],
  },
  {
    name: "Benefits Administration",
    href: "#",
    icon: DocumentCurrencyDollarIcon,
    current: false,
    submenu: [
      {
        name: "Insurance Management",
        href: "benefits/insurance-management",
      },
      {
        name: "Retirement & Benefits",
        href: "benefits/retirement-and-benefits",
      },
      {
        name: "Benefits Enrollment",
        href: "benefits/benefits-enrollment",
      },
      {
        name: "Benefits Reporting",
        href: "benefits/benefits-reporting",
      },
    ],
  },
  {
    name: "Performance Management",
    href: "#",
    icon: BoltIcon,
    current: false,
    submenu: [
      {
        name: "Goals & Objectives",
        href: "performance/goals-and-objectives",
      },
      {
        name: "Performance Reviews",
        href: "performance/performance-reviews",
      },
      {
        name: "Feedback & Development",
        href: "performance/feedback-and-development",
      },
      {
        name: "Self & Peer Reviews",
        href: "performance/self-and-peer-reviews",
      },
      {
        name: "Training & Development",
        href: "performance/training-and-development",
      },
    ],
  },
  { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

const userNavigation: UserNavigationItem[] = [
  // { name: "Your Profile", href: "#" },
  // { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [userDetails, setUserDetails] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = getSession();
    if (session) {
      setUserDetails(session);
    } else {
      navigate("/auth/login"); // Redirect to login if no session is found
    }
  }, [navigate]);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-primary-1 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div
                    onClick={() => navigate("/")}
                    className="flex flex-shrink-0 items-center px-4"
                  >
                    <h1 className="text-primary-3 text-xl font-semibold cursor pointer">
                      HR Management
                    </h1>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="flex-1 space-y-1 px-2 pb-4">
                      {navigation.map((item) => (
                        <div key={item.name}>
                          <Link
                            to={item.href}
                            onClick={(e) => {
                              if (item.submenu) {
                                e.preventDefault();
                                toggleSubmenu(item.name);
                              }
                            }}
                            className={classNames(
                              item.current
                                ? "bg-primary-2 text-white"
                                : "text-primary-3 hover:bg-primary-2",
                              "group flex items-center px-  py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className="mr-2  h-6 w-6 flex-shrink-0 text-primary-3"
                              aria-hidden="true"
                            />
                            {item.name}
                            {item.submenu?.length! > 0 && (
                              <ChevronDownIcon className="ml-5 w-4 h-4" />
                            )}
                          </Link>
                          {item.submenu && openSubmenus[item.name] && (
                            <div className="ml-6 mt-1 space-y-1">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="text-primary-3 hover:bg-primary-2 group flex items-center px-2 py-1 text-xs font-medium rounded-md"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component */}
          <div className="flex flex-grow flex-col overflow-y-auto bg-primary-1 pt-5" style={{ backgroundColor: '#36A2EB' }}>
            <div
              onClick={() => navigate("/")}
              className="flex flex-shrink-0 items-center px-4 cursor-pointer"
            >
              <h1 className="text-white text-xl font-semibold">
                HR Management
              </h1>
            </div>
            <div className="mt-5 flex flex-1 flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      to={item.href}
                      onClick={(e) => {
                        if (item.submenu) {
                          e.preventDefault();
                          toggleSubmenu(item.name);
                        }
                      }}
                      className={classNames(
                        item.current
                          ? "bg-primary-2 text-white"
                          : "text-primary-3 hover:bg-primary-2",
                        "group  flex items-center px-1 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className="mr-2  h-6 w-6 flex-shrink-0 text-primary-3"
                        aria-hidden="true"
                      />
                      {item.name}
                      {item.submenu?.length! > 0 && (
                        <ChevronDownIcon className="ml-5 w-4 h-4" />
                      )}
                    </Link>
                    {item.submenu && openSubmenus[item.name] && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className="text-primary-3 hover:bg-primary-2 group flex items-center px-2 py-1 text-xs font-medium rounded-md"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Fancy Card at the base of the sidebar */}
            <div className="mt-auto px-4 py-6 cursor-pointer">
              <div className="bg-gradient-to-r from-white via-[#A5D8F5] to-[#C9EAF9] rounded-lg p-4 text-primary-1 shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
                <h3 className="text-xl font-bold mb-2">✨ Coming Soon!</h3>
                <p className="text-sm">
                  Applicants rating based on CV is coming soon. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col md:pl-64">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-2 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1">
                <form className="flex w-full md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                      <MagnifyingGlassIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search-field"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="rounded-full bg-white p-1 mr-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-2 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6" aria-hidden="true" /> */}
                  <NotificationButton />
                </button>

                {/* LOGOUT Button */}
                <LogoutButton />

              </div>
            </div>
          </div>

          <main>
            <div className="py-8">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <Outlet />

                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
