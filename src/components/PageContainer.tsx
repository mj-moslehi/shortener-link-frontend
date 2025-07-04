import * as React from "react";
import NavBar from "./NavBar.tsx";

export default function PageContainer({children}: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col items-center overflow-x-hidden bg-[#0E1C24]">
            <NavBar/>
            <div className='px-8 flex-col flex'>
                {children}
            </div>
        </div>
    );
}