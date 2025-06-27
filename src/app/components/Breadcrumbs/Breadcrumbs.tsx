"use client"

import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid"; 
import { usePathname } from "next/navigation";
import { HomeIcon } from "@heroicons/react/16/solid";

export function Breadcrumbs() {

    const pathname = usePathname();
    const pathArray = pathname.split('/').filter(segment => segment !== '');

    let currentPath = '';

    return (
        <div data-testid="breadcrumbs" className="w-full">
            <ul className="flex flex-row items-center gap-1">
                {
                    pathArray.map((segment, index) => {
                        // Capitalize the first letter of each segment for display
                        const displaySegment = segment.charAt(0).toUpperCase() + segment.slice(1);

                        // Append the current segment to build the path
                        currentPath += `/${segment}`;

                        // Check if it's the last segment
                        const isLastSegment = index === pathArray.length - 1;
                        const isFirstSegment = index === 0;

                        return (
                            <li key={segment} className="flex flex-row gap-1 items-center">
                                {/* Render as a link if not the last segment, otherwise render as plain text */}
                                {isFirstSegment ? (
                                        pathArray.length > 1 ? (
                                            <Link
                                                href={currentPath}
                                                className="text-base text-ellipsis flex flex-row items-center gap-2 hover:text-blue-500"
                                            >
                                                <HomeIcon className="size-5"></HomeIcon>
                                                <span className="hidden sm:block">{displaySegment}</span>
                                            </Link>
                                        ) : (
                                            <div className="flex flex-row items-center gap-2">
                                                <HomeIcon className="size-5"></HomeIcon>
                                                <span className="font-semibold text-base hidden sm:block">
                                                    {displaySegment}
                                                </span>
                                            </div>
                                        )
                                ) : isLastSegment ? (
                                    <span className="font-semibold text-base ">
                                        {displaySegment}
                                    </span>
                                ) : (
                                    <Link
                                        href={currentPath}
                                        className="hover:text-blue-500 text-base text-ellipsis"
                                    >
                                        {displaySegment}
                                    </Link>
                                )}
                                {/* Separator icon */}
                                <ChevronRightIcon className="size-4"/>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}