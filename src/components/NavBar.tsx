import api from '../services/domain.ts'
import HamburgerMenu from "../assets/hamburgerMenu.tsx";
import {useState} from "react";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const logout = async () => {
        await api.post("/user/logout");
        alert("Logout successful");
    };

    return (
        <header className="w-full p-4 bg-white shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="md:text-2xl sm:text-lg font-bold text-gray-800">Shortener Link</h1>
                <ul className="sm:flex space-x-4 hidden">
                    <li><a href='/home' className="text-gray-600 hover:text-gray-800">Home</a></li>
                    <li>
                        <a
                            href='/'
                            className="text-gray-600 hover:text-gray-800"
                            onClick={logout}
                        >
                            Logout
                        </a>
                    </li>
                </ul>
                <div
                    className="sm:hidden hover:opacity-65 cursor-pointer"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    <HamburgerMenu />
                </div>
            </nav>
            <div
                className={`sm:hidden transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}
            >
                <ul className="flex flex-col items-end space-y-2 p-4 ">
                    <li className="border border-gray-500 bg-gray-200 rounded-2xl w-[100px] flex justify-center">
                        <a href='/home' className="p-2 text-gray-600 text-sm">
                            Home
                        </a>
                    </li>
                    <li className="border border-gray-500 bg-gray-200 rounded-2xl w-[100px] flex justify-center">
                        <a
                            href='/'
                            className="p-2 text-gray-600 text-sm"
                            onClick={logout}
                        >
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    );
}
