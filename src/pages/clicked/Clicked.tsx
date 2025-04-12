import LinkFields from "../../components/LinkFields.tsx";
import ClickDetail from "../../components/ClickDetail.tsx";
import { useLinkStore } from "../../components/LinkView/store/useLinkStore.ts";
import { useEffect, useState } from "react";
import api from "../../services/domain.ts";

export interface Click {
    country: string;
    region: string;
    city: string;
    road: string;
    neighborhood: string;
    clicked_ip: string;
    device: string;
    browser: string;
    date: string;
    referrer_type: string;
}

export default function Clicked() {
    const link = useLinkStore((state) => state.selectedLink);
    const [clicks, setClicks] = useState<Click[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null); // reset error before new request
                const response = await api.get("clicked/get-clicked-by-user-id-link-id/" + link?.id);
                if (response.data && Array.isArray(response.data)) {
                    if (response.data.length === 0) {
                        setError("No click data.");
                    }
                    const mappedClicks: Click[] = response.data.map((item: any) => ({
                        ...item,
                    }));
                    setClicks(mappedClicks);
                } else {
                    setError("Unexpected response from server.");
                }
            } catch (err: any) {
                setError(err.response?.data?.message || "An error occurred while fetching click data.");
            }
        };

        if (link?.id) {
            fetchData();
        }
    }, [link?.id]);

    return (
        <div className='flex flex-col items-center justify-center w-full '>
            <h1 className='text-lg font-bold text-gray-500 my-8 md:text-2xl '>Chosen Link :</h1>
            <LinkFields />

            <h1 className=' font-bold text-gray-500 my-8 md:text-2xl text-lg'>Clicks Details :</h1>

            {error && (
                <div className="text-red-600 text-lg font-semibold my-4">
                    {error}
                </div>
            )}

            {clicks.map((click, index) => (

                <ClickDetail key={index} click={click}  />
            ))}
        </div>
    );
}
