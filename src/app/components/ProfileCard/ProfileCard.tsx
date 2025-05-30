"use client"

import Image from "next/image"
import Link from "next/link"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { PopoverMini } from "../PopoverMini/PopoverMini"
import { useState, useEffect, useRef } from "react"

export function ProfileCard({name, subscription} : {name : string, subscription : string}) {
    const [showPopover, setShowPopover] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
                setShowPopover(false);
            }
        };

        if (showPopover) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopover]);

    return (
        <div className="relative px-4 py-3 border-1 border-zinc-300 
                        rounded-3xl flex flex-row items-center justify-between 
                        cursor-pointer hover:bg-zinc-100"
            onClick={() => setShowPopover(true)}
            ref={cardRef}
        >
            <div className="flex flex-row items-center gap-5">
                {/* Change this later */}
                <UserCircleIcon className="size-10"/>
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-base font-bold">{name}</h1>
                    <p className="text-sm font-medium text-zinc-500">{subscription}</p>
                </div>
            </div>
            <Link href="/dashboard/settings" onClick={(e) => e.stopPropagation()}>
                <Cog6ToothIcon className="size-8"/>
            </Link>

            <div className={`origin-bottom-left absolute bottom-0 left-1/2 transition-transform ${showPopover ? 'scale-100' : "scale-0"}`}>
                <PopoverMini/>
            </div>
        </div>  
    )
}