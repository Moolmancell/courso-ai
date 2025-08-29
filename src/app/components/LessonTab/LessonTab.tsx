import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import { CheckCircleIcon as CheckCircleOutline } from '@heroicons/react/24/outline';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function LessonTab({children, status, lessonID}: {children?: React.ReactNode, status: 'completed' | 'incomplete', lessonID: string}) {

    const pathname = usePathname();

    return <Link href={`${pathname}/${lessonID}`} data-testid="lessontab" className='w-full flex flex-row justify-between items-center p-3 rounded-2xl hover:bg-zinc-100 cursor-pointer'>
        <div className='flex flex-row gap-3 items-center'>
            <BookOpenIcon className="h-6 w-6 min-h-[24px] min-w-[24px] text-zinc-500" />
            <span className='font-medium text-base'>{children}</span>
        </div>

        <div data-testid={status === 'completed' ? 'Completed' : 'Incomplete'}>
            {status === 'completed' && <CheckCircleSolid className="h-6 w-6 text-green-500" />}
            {status === 'incomplete' && <CheckCircleOutline className="h-6 w-6 text-zinc-500" />}
        </div>
    </Link>;
}