import Link from "next/link";
import { SparklesIcon } from "@heroicons/react/24/outline";

export function Upgrade() {
    return (
        <Link href={"/upgrade"} className="flex flex-row gap-4 items-center px-4 py-3 border-1 rounded-3xl border-zinc-300 bg-white hover:bg-zinc-100">
            <SparklesIcon className="size-8" />
            <div className="flex flex-col gap-1">
                <h1 className="font-bold text-base">Upgrade Now</h1>
                <p className="font-medium text-sm text-zinc-500">Get more lessons per day</p>
            </div>
        </Link>
    )
}