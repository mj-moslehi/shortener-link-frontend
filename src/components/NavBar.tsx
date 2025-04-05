export default function NavBar(){
    return(
        <header className="w-full p-4 bg-white shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Shortener Link</h1>
                <ul className="flex space-x-4">
                    <li><a href='/home' className="text-gray-600 hover:text-gray-800">Home</a></li>
                </ul>
            </nav>
        </header>
    )
}