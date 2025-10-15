import { ElementType } from "react";

export function CenteredCard({ Icon, title, message, children }: 
    { Icon: ElementType, title: string, message: string, children?: React.ReactNode }) {

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="xl:ml-72 max-w-96 min-w-72 flex flex-col gap-8 items-center bg-white p-8 w-fit rounded-3xl border border-zinc-300">
                <Icon className="size-20 w-20 h-20 text-zinc-500" strokeWidth={1.1} />
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1 className="text-xl font-bold text-center">{title}</h1>
                    <p className="text-center">{message}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-2">
                    {children}
                </div>

            </div>
        </div>
    );
}