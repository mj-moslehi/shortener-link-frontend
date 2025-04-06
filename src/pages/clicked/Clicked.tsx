import LinkFields from "../../components/LinkFields.tsx";
import ClickDetail from "../../components/ClickDetail.tsx";

export default function Clicked() {
    return (
        <div className='flex flex-col items-center justify-center w-full '>
            <h1 className='text-3xl font-bold text-gray-500 my-8'>Chosen Link :</h1>
            <LinkFields />

            <h1 className='text-3xl font-bold text-gray-500 my-8'>Clicks Details :</h1>
            {[...Array(10)].map((_, i) => (
                <ClickDetail key={i} />
            ))}
        </div>
    );
}
