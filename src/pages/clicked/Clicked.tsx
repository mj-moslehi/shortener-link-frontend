import LinkFields from "../../components/LinkFields.tsx";

export default function Clicked() {
    return(
        <div className='felx justify-center'>
            <h1 className='text-3xl font-bold text-gray-500 my-8' >Chosen Link : </h1>
            <LinkFields/>
            <h1 className='text-3xl font-bold text-gray-500 my-8' >Clicks Details : </h1>

        </div>
    )
}