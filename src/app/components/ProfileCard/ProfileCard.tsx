import Image from "next/image"
import Link from "next/link"
import { UserCircleIcon } from "@heroicons/react/24/outline"
import { Cog6ToothIcon } from "@heroicons/react/24/outline"

export function ProfileCard({name, subscription} : {name : string, subscription : string}) {
    return (
        <div className="px-4 py-3 border-1 border-zinc-300 rounded-3xl flex flex-row items-center justify-between cursor-pointer hover:bg-zinc-100">
            <div className="flex flex-row items-center gap-5">
                {/* Change this later */}
                <UserCircleIcon className="size-10"/>
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-base font-bold">{name}</h1>
                    <p className="text-sm font-medium text-zinc-500">{subscription}</p>
                </div>
            </div>
            <Link href="/dashboard/settings">
                <Cog6ToothIcon className="size-8"/>
            </Link>
        </div>  
    )
}