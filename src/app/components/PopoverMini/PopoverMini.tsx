import Link from "next/link"
import { Cog6ToothIcon } from "@heroicons/react/16/solid"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/16/solid"

export function PopoverMini() {
    return (
        <div className="p-3 border-1 border-zinc-300 rounded-3xl flex flex-col gap-2 bg-white">
            <Link href="/dashboard/settings" className="flex flex-row items-center gap-2 px-3 py-2 rounded-3xl hover:bg-zinc-100">
                <Cog6ToothIcon className="size-4"/>
                <h1 className="text-base font-normal">Settings</h1>
            </Link>

            <Link href="/dashboard/logout" className="flex flex-row items-center gap-2 px-3 py-2 rounded-3xl hover:bg-red-100">
                <ArrowLeftStartOnRectangleIcon className="size-4 text-red-600" />
                <h1 className="text-base font-normal text-red-600">Logout</h1>
            </Link>
        </div>
    )
}