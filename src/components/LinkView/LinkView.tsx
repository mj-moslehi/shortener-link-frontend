import {Link} from '../../pages/myLinks/MyLinks.tsx'
import {useLinkStore} from "./store/useLinkStore.ts";
import api from '../../services/domain.ts';

interface LinkViewProps {
    link: Link;
}

export default function LinkView({link}: LinkViewProps) {
    const setSelectedLink = useLinkStore((state) => state.setSelectedLink);
    const handleDelete = async () => {
        await api.patch(`/delete/${link.id}`);
        alert('Link deleted successfully');
    }
    return (
        <div
            className='p-3 my-3 rounded-lg shadow-md bg-gray-200 max-w-lg min-w-sm overflow-x-hidden hover:overflow-x-visible'>
            <h1 className='text-2xl'>{link.new_url}</h1>
            <div className='flex items-center justify-between mt-4'>

                <button
                    className='flex justify-center items-center bg-green-400 text-black p-2 rounded-md hover:cursor-pointer hover:shadow-md font-medium hover:opacity-65'>Update
                </button>

                <a className='flex justify-center items-center bg-yellow-200 text-black p-2 rounded-md hover:cursor-pointer hover:shadow-md font-medium hover:opacity-65'
                   href='/clicked'
                   onClick={() => setSelectedLink(link)}
                >
                    Details
                </a>

                <button
                    onClick={handleDelete}
                    className='flex justify-center items-center bg-red-600 text-black p-2 rounded-md hover:cursor-pointer hover:shadow-md font-medium hover:opacity-65'>Delete
                </button>

            </div>
        </div>
    )
}