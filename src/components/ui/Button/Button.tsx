import Link from "next/link";
import { MouseEventHandler } from "react";

type typeButton = 'link'| 'button';
type buttonStyles = 'default-button' | 'blue-button';

export function Button({children, type = 'button', href, onClick, className, disabled, Icon, reverse = false, ...props} : 
    {children?: React.ReactNode, type?: typeButton, href?: string, onClick?: MouseEventHandler, className?: string, disabled?: boolean, Icon?: React.ElementType, reverse?: boolean}) {
    switch(type) {
        case "link":
            if (!href) {
                throw new Error("`href` must be provided when `type` is 'link'");
            }
            return (
                <Link href={href} className={`${className} default-button`} {...props}>
                    <div data-testid="button-container" className={`h-[21px] flex ${reverse ? "flex-row-reverse" : "flex-row"} gap-3 items-center`}>
                        {Icon && <Icon data-testid="icon" className="size-6 w-6 h-6" />}
                        {children}
                    </div>
                </Link>
            )
            break;
        case "button":
            return (
                <button onClick={onClick} className={`${className} default-button`} disabled={disabled} {...props}>
                    <div data-testid="button-container" className={`h-[21px] flex ${reverse ? "flex-row-reverse" : "flex-row"} gap-3 items-center`}>
                        {Icon && <Icon data-testid="icon" className="size-6 w-6 h-6" />}
                        {children}
                    </div>
                </button>
            )
    }
}