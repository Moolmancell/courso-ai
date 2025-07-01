import Link from "next/link";
import { MouseEventHandler } from "react";

type typeButton = 'link'| 'button';
type buttonStyles = 'default-button' | 'blue-button';

export function Button({children, type = 'button', href, onClick, className, ...props} : 
    {children?: React.ReactNode, type?: typeButton, href?: string, onClick?: MouseEventHandler, className?: string}) {
    switch(type) {
        case "link":
            if (!href) {
                throw new Error("`href` must be provided when `type` is 'link'");
            }
            return (
                <Link href={href} className={`${className} default-button`} {...props}>
                    {children}
                </Link>
            )
            break;
        case "button":
            return (
                <button onClick={onClick} className={`${className} default-button`} {...props}>
                    <div className="h-[21px] flex flex-row gap-2 items-center">{children}</div>
                </button>
            )
    }
}