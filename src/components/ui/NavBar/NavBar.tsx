"use client"
import Image from "next/image"
import { useState } from "react"
import { NavLink } from "../NavLink/NavLink"
import { HomeIcon } from "@heroicons/react/24/outline"
import { AcademicCapIcon } from "@heroicons/react/24/outline"
import { Button } from "../Button/Button"
import { Bars2Icon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/outline" 
import { SparklesIcon } from "@heroicons/react/24/outline"
import { UserCircleIcon } from "@heroicons/react/24/outline"

export function NavBar() {

    const [open, setOpen] = useState(false);  

    return (
        <nav data-testid="navbar" className="w-full h-20 bg-white flex flex-row items-center justify-between p-4 md:px-8 border border-zinc-300 rounded-b-3xl">
            
            {/* 1. Mobile Hamburger Button (Only on Mobile) */}
            <button data-testid='hamburger-button' className="block md:hidden cursor-pointer rounded-lg hover:ring ring-zinc-300 ring-offset-2" onClick={() => setOpen(true)}>
                <Bars2Icon className="h-8 w-8" />
            </button>
            
            {/* 2. Logo (Desktop) - ADDED w-[147px] h-[35px] */}
            <a data-testid="logo" href="/dashboard" className="hidden md:block w-[147px] h-[35px]"> 
                <Image src='/LogoBlack.svg' alt='CourserAI' width={147} height={35} />
            </a>

            {/* 3. Mobile Overlay */}
            {open && (
                <div
                className="fixed inset-0 bg-black opacity-50 z-40 xl:hidden"
                onClick={() => setOpen(false)} 
                ></div>
            )}

            {/* 4. Main Content (The Menu Drawer on Mobile / The Links Bar on Desktop) */}
            <div data-testid="navbar-content" className={`${open ? 'translate-x-0' : '-translate-x-full'} 
                transition-transform duration-300 ease-in-out
                flex flex-col bg-white fixed top-0 left-0
                w-full h-full max-w-72 py-7 px-4 border 
                border-zinc-300 rounded-r-3xl gap-8 z-50

                md:static md:translate-x-0 md:bg-transparent md:flex-1 md:h-auto 
                md:flex-row md:items-center md:border-0 md:rounded-none md:px-0 md:py-0 md:max-w-none md:ml-16 md:justify-between  
                `}>
                
                {/* Mobile Header (Logo & Close Button - Only on Mobile) */}
                <div className="flex flex-row justify-between items-center md:hidden"> 
                    {/* Logo (Mobile) - ADDED w-[147px] h-[35px] */}
                    <a data-testid="logo" href="/dashboard" className="w-[147px] h-[35px]"> 
                        <Image src='/LogoBlack.svg' alt='CourserAI' width={147} height={35}  />
                    </a>

                    <button data-testid="close-button" className="md:hidden cursor-pointer rounded-lg hover:ring ring-zinc-300 ring-offset-2" onClick={() => setOpen(false)}>
                        <XMarkIcon className="h-8 w-8" />
                    </button>
                </div>

                <div data-testid="navbar-links" className="flex-col md:flex-row h-full md:h-auto gap-1 md:flex md:items-center">
                    <NavLink href="/dashboard" icon={HomeIcon} name="Home" onClick={() => null} homeUrl="/dashboard" />
                    <NavLink href="/dashboard/courses" icon={AcademicCapIcon} name="About" onClick={() => null} homeUrl="/dashboard" />
                </div>

                {/* Upgrade Button */}
                <Button data-testid="upgrade-button" Icon={SparklesIcon}>Upgrade Now</Button>
            </div>

            {/* 5. Profile Button (Needs to be aligned with the rest) */}
            <button data-testid="profile" className="hidden md:block md:ml-4"><UserCircleIcon className="h-8 w-8"/></button>
            <button data-testid="profile" className="md:hidden"><UserCircleIcon className="h-8 w-8"/></button>
        </nav>
    )
}