'use client'
import { use } from 'react'

export default function Page({
    params,
}: {
    params: Promise<{ courseID: string }>
}) {
    const { courseID } = use(params)

    return (
        <div>
            {courseID}
        </div>
    )
}