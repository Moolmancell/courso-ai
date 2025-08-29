import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolid } from '@heroicons/react/24/solid';
import { CheckCircleIcon as CheckCircleOutline } from '@heroicons/react/24/outline';

export function LessonTab({children, status}: {children?: React.ReactNode, status: 'completed' | 'incomplete'}) {
    return <div data-testid="lessontab">
        <div>
            <BookOpenIcon className="h-5 w-5 text-zinc-500" />
            <span>{children}</span>
        </div>

        <div data-testid={status === 'completed' ? 'Completed' : 'Incomplete'}>
            {status === 'completed' && <CheckCircleSolid className="h-5 w-5 text-green-500" />}
            {status === 'incomplete' && <CheckCircleOutline className="h-5 w-5 text-zinc-500" />}
        </div>
    </div>;
}