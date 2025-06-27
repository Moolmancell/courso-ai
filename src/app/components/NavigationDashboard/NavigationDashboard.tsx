"use client"

import { useState } from "react"
import Image from "next/image";
import { NavLink } from "../NavLink/NavLink";
import { Bars2Icon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/outline";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import { Upgrade } from "../Upgrade Plan/Upgrade";
import { ClockIcon } from "@heroicons/react/24/outline";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { BellIcon } from "@heroicons/react/24/outline";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";

interface NavLinkItem { // Renamed to avoid conflict with the component
  name: string
  href: string
  icon: React.ElementType
}

export function NavigationDashboard(): React.ReactElement {
  const [isOpen, setOpen] = useState(false);

  const links: NavLinkItem[] = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "Courses", href: "/dashboard/courses", icon: AcademicCapIcon },
    { name: "Statistics", href: "/dashboard/stats", icon: ChartBarSquareIcon },
    { name: "History", href: "/dashboard/history", icon: ClockIcon }
  ]

  return (
    <nav className="relative"> {/* Add relative to the nav for absolute children */}
        {/* Header */}
        <div className="z-10 p-4 flex flex-row backdrop-blur-sm justify-between items-center md:px-8 bg-zinc-100/65 fixed top-0 w-full">
          <div className="left-side flex flex-row items-center gap-4">
            <button className="hamburger cursor-pointer xl:hidden" onClick={() => setOpen(true)}>
              <Bars2Icon className="size-8" />
            </button>
            <Breadcrumbs></Breadcrumbs>
          </div>
          
          <div className="right-side flex flex-row justify-end gap-4">
            <button>
              <BellIcon className="size-8"/>
            </button>
            <button className="profile-button">
            {/* Needs to be dynamic */}
              <UserCircleIcon className="size-8" />
            </button>
          </div>

        </div>

        {/* The Collapsable Container (Mobile Menu) */}
        <div
            className={`
            fixed top-0 left-0 bg-white h-screen
            w-full max-w-80 border-r border-zinc-300
            rounded-r-3xl py-7 px-4 md:px-7 transition-transform
            duration-300 ease-in-out transform z-50 flex
            flex-col gap-8
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
            <div className="flex flex-row justify-between items-center"> {/* Added items-center */}
            <Image src='/LogoBlack.svg' alt='CourserAI' width={147} height={35} />
            <button onClick={() => setOpen(false)}>
                <XMarkIcon className="size-8 cursor-pointer" />
            </button>
            </div>

            {/* links */}
            <ul className="flex flex-col gap-1 h-full">
            {
                links.map((obj) =>
                <li key={obj.href}>
                    <NavLink
                    href={obj.href}
                    name={obj.name}
                    icon={obj.icon}
                    onClick={() => setOpen(false)}
                    />
                </li>)
            }
            </ul>

            {/* Bottom Section */}
            <div className="flex flex-col gap-3">
                <Upgrade/>
            </div>

        </div>
    
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 xl:hidden"
          onClick={() => setOpen(false)} // Close menu when clicking outside
        ></div>
      )}

      {/* Desktop Nav (hidden on mobile) */}
      <div className="
                    fixed h-screen full-size hidden w-72 
                    border-1 rounded-r-3xl border-zinc-300
                    px-7 py-8 xl:flex flex-col gap-8 z-20
                    bg-white
                    "
        >
            <Image src='/LogoBlack.svg' alt='CourserAI' width={147} height={35} />
            <ul className="flex flex-col gap-1 h-full">
            {
                links.map((obj) =>
                <li key={obj.href}>
                    <NavLink
                    href={obj.href}
                    name={obj.name}
                    icon={obj.icon}
                    onClick={() => setOpen(false)}
                    />
                </li>)
            }
            </ul>

            <div className="flex flex-col gap-3">
                <Upgrade/>
            </div>

      </div>
    </nav>
  )
}