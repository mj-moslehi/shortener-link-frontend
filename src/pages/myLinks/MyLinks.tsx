import LinkView from "../../components/LinkView/LinkView.tsx";
import api from '../../services/domain.ts';
import {useEffect, useState} from "react";
import {AxiosError} from "axios";

export interface Link {
    id: number;
    raw_link: string;
    new_domain: string;
    new_path: string;
    new_url: string;
    created_at: string;
    tag: string | null;
    start_expiration: string | null;
    end_expiration: string | null;
    private_status: boolean;
    qr_code: Buffer;
    title: string | null;
    password: string;
    user_id: number;
    team_member_id: number | null;
    folder_id: number | null;
    sub_folder_id: number | null;
    deleted: boolean;
}

export default function MyLinks() {
    const [links, setLinks] = useState<Link[]>([]);
    const [error, setError] = useState<string>('');

    const fetchLinks = async () => {
        try {
            const response = await api.post('/get-link-by-user-id');
            setLinks(response.data);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError(error?.response?.data?.message || error?.response?.data || 'An error occurred while fetching links.');
            } else {
                setError('An unknown error occurred.');
            }
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    return (
        <div className='mt-8'>
            <h1 className='text-4xl font-medium text-gray-500 mb-8'>Your Links List:</h1>

            {error && (
                <p className="text-red-600 text-center mb-4">{error}</p>
            )}

            {links.length === 0 && !error && (
                <p className="text-gray-600 text-center mb-4">No links available.</p>
            )}

            {links.map((link) => (
                <LinkView  link={link}/>
            ))}
        </div>
    );
}
