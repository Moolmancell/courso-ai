"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEventHandler } from "react";

export function NavLink({href, name, icon: Icon, onClick = () => null} : 
    {href: string, name: string, icon: React.ElementType, onClick: MouseEventHandler}) {

    const pathname = usePathname(); 
    const isActive = pathname === href; 

    return (
        <Link 
            className=
                    {`
                        flex flex-row gap-3 
                        px-4 py-3 rounded-3xl text-black
                        ${isActive ? "bg-blue-200 text-blue-900" : "bg-white hover:bg-zinc-100"}
                    `} 
            href={href} onClick={onClick}>
            <Icon className={`size-6 ${isActive ? "outline-blue-900" : "outline-black"}`}/>
            <h2 className="text-base">{name}</h2>
        </Link>
    )
}