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
  ]

  return (
    <nav className="relative"> {/* Add relative to the nav for absolute children */}
        {/* Mobile Header (Always visible on mobile) */}
        <div className="p-4 flex flex-row justify-between items-center md:px-8 xl:hidden bg-zinc-100 fixed top-0 w-full">
            <button className="hamburger cursor-pointer" onClick={() => setOpen(true)}>
            <Bars2Icon className="size-8" />
            </button>

            <button className="profile-button">
            {/* Needs to be dynamic */}
            <UserCircleIcon className="size-8" />
            </button>
        </div>

        {/* The Collapsable Container (Mobile Menu) */}
        <div
            className={`
            fixed top-0 left-0 bg-white h-screen
            w-full max-w-80 border-r border-zinc-300
            rounded-r-3xl py-7 px-4 md:px-7 transition-transform
            duration-300 ease-in-out transform z-50 flex
            flex-col gap-16
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
      <div className="full-size hidden xl:block">
        {/* Your desktop navigation goes here */}
      </div>
    </nav>
  )
}