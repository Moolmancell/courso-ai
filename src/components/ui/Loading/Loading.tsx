export function Loading() {
    return <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" data-testid="loading">
        <div className="xl:ml-72 flex flex-col gap-6 items-center justify-center max-w-[360px] p-4 rounded-3xl">
            <svg
                fill="#2B7FFFFF"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
            >
                <circle cx="12" cy="12" r="3" />
                <g>
                    <circle cx="4" cy="12" r="3" />
                    <circle cx="20" cy="12" r="3" />
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        calcMode="spline"
                        dur="1s"
                        keySplines=".36,.6,.31,1;.36,.6,.31,1"
                        values="0 12 12;180 12 12;360 12 12"
                        repeatCount="indefinite"
                    />
                </g>
            </svg>
        </div>
    </div>
}