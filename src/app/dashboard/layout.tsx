import { NavigationDashboard } from "../components/NavigationDashboard/NavigationDashboard"
import { DM_Sans } from 'next/font/google';

export const dm_sans = DM_Sans({
  subsets: ['latin'],
  display: 'swap', 
  variable: '--font-dm-sans', 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], 
  style: ['normal', 'italic'],
});

export default function DashboardLayout({children} : {children : React.ReactNode}) {
    return (
        <div className={dm_sans.variable}>
            <NavigationDashboard/>
            <main className="bg-zinc-100 font-dm-sans pt-16 min-h-screen xl:pl-72">
                {children}
            </main>
        </div>
    )
}