export default function LinkFields() {
    return (


        <div className="flex flex-wrap gap-4 bg-gray-300 rounded-lg p-4 shadow-md w-2/3">
            <div className='flex flex-wrap gap-4'>
                <div className='bg-blue-400 p-2 flex justify-center font-medium rounded-2xl my-3 min-w-[200px]'>
                    Main Link :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl overflow-hidden'>
                        https://open.spotify.com/playlist/37i9dQZF1DXdaIjAsPE9ht
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    New Path :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        hashem123
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    New Domain :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        localhost:3000
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    New URL :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        https://localhost:3000/hashem111
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    Created At :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        2025-02-04 10:58:19.128970
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    Tag :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        my tag
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    Start Expiration :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        2025-02-08 23:13:25.268358
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    End Expiration :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        2025-02-08 23:13:25.268358
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    Private Status :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        Private
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    Title :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        my url is good
                    </div>
                </div>

                <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                    Clicked Count :
                    <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                        30
                    </div>
                </div>


            </div>
            <div className='bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]'>
                QR Code :
                <div className='ml-1 flex items-center bg-blue-300 px-2 rounded-2xl'>
                    <a href="https://images.pexels.com/photos/7818232/pexels-photo-7818232.jpeg?auto=compress&cs=tinysrgb&w=600"
                       download="qr-code.png">
                        <img
                            src="https://images.pexels.com/photos/7818232/pexels-photo-7818232.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="QR Code"
                            className="w-[100px] h-[100px] object-contain cursor-pointer"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}
