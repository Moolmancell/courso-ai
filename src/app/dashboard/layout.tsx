export default function DashboardLayout({children} : {children : React.ReactNode}) {
    return (
        <div>
            <nav>this is nav</nav>
            {children}
        </div>
    )
}