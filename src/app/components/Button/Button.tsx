import Link from "next/link";
import { MouseEventHandler } from "react";

type typeButton = 'link'| 'button';
type buttonStyles = 'default-button' | 'blue-button';

export function Button({children, type = 'button', href, onClick, className} : 
    {children?: React.ReactNode, type?: typeButton, href?: string, onClick?: MouseEventHandler, className?: string}) {
    switch(type) {
        case "link":
            if (!href) {
                throw new Error("`href` must be provided when `type` is 'link'");
            }
            return (
                <Link href={href} className={className}>
                    {children}
                </Link>
            )
            break;
        case "button":
            return (
                <button onClick={onClick} className={className}>
                    {children}
                </button>
            )
    }
}