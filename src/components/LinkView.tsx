interface LinkViewProps {
    link: string;
}

export default function LinkView({link}: LinkViewProps) {
    return (
        <div className='p-3 my-3 rounded-lg shadow-md bg-gray-200 '>
            <h1 className='text-2xl'>{link}</h1>
            <div className='flex items-center justify-between mt-4'>
                <button className='flex justify-center items-center bg-green-400 text-black p-2 rounded-md hover:cursor-pointer hover:shadow-md font-medium hover:opacity-65' >Update</button>
                <a className='flex justify-center items-center bg-yellow-200 text-black p-2 rounded-md hover:cursor-pointer hover:shadow-md font-medium hover:opacity-65' href='/clicked' >Details</a>
                <button className='flex justify-center items-center bg-red-600 text-black p-2 rounded-md hover:cursor-pointer hover:shadow-md font-medium hover:opacity-65' >Delete</button>
            </div>
        </div>
    )
}