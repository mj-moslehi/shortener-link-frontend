import LinkView from "../../components/LinkView.tsx";

const links: string[] = ['salama', 'sldkfjwel', 'lsdkfjww'];
export default function MyLinks() {

    return (
        <div className='mt-8'>
            <h1 className='text-4xl font-medium text-gray-500 mb-8'>Your Links List :</h1>
            {links.map((link) => (
                <LinkView link={link}/>
            ))}
        </div>
    );
}