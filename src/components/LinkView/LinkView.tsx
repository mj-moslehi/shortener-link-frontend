import { Link } from '../../pages/myLinks/MyLinks.tsx';
import { useLinkStore } from "./store/useLinkStore.ts";
import api from '../../services/domain.ts';

interface LinkViewProps {
    link: Link;
}

export default function LinkView({ link }: LinkViewProps) {
    const setSelectedLink = useLinkStore((state) => state.setSelectedLink);

    const handleDelete = async () => {
        await api.patch(`/delete/${link.id}`);
        alert('Link deleted successfully');
    };

    return (
        <div className="p-4 sm:p-5 my-4 rounded-xl shadow-md bg-gray-200 max-w-full sm:max-w-lg w-full">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl truncate">{link.new_url}</h1>

            <div className="flex flex-wrap gap-3 mt-4">
                <button
                    className="flex-1 sm:flex-none bg-green-400 text-black px-4 py-2 rounded-md font-medium text-sm sm:text-base md:text-lg hover:opacity-75 transition"
                >
                    Update
                </button>

                <a
                    className="flex-1 sm:flex-none bg-yellow-200 text-black px-4 py-2 rounded-md font-medium text-sm sm:text-base md:text-lg text-center hover:opacity-75 transition"
                    href="/clicked"
                    onClick={() => setSelectedLink(link)}
                >
                    Details
                </a>

                <button
                    onClick={handleDelete}
                    className="flex-1 sm:flex-none bg-red-600 text-black px-4 py-2 rounded-md font-medium text-sm sm:text-base md:text-lg hover:opacity-75 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
