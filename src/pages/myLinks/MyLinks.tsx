export default function MyLinks() {
    return (
        <>
            <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mt-8 ">
                <a href='/home' className="bg-blue-500 p-6 text-white rounded-lg shadow-md">Home</a>
                <a href='/create-new-url' className="bg-green-500 p-6 text-white rounded-lg shadow-md">Create New URL</a>
                <a href='/my-profile' className="bg-green-500 p-6 text-white rounded-lg shadow-md">My Profile</a>
            </div>
        </>
    );
}