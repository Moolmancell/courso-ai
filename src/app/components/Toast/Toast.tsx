"use client"

import { useEffect, useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"

export function Toast({children, className = ""} : {children?: React.ReactNode, className?: string}) {

    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 10000)

        return () => clearTimeout(timer);
    }, [])

    if (!visible) return null

    return <div className={`fixed top-0 right-1/2 translate-x-1/2 translate-y-8 toast-animation ${className}`}>
        {children}
        <button data-testid="exit-button" onClick={() => setVisible(false)}>
            <XMarkIcon className="w-4 h-auto"></XMarkIcon>
        </button>
    </div>
}