import {useEffect, useState} from "react";
import {useLinkStore} from "./LinkView/store/useLinkStore.ts";
import api from "../services/domain.ts";

export default function LinkFields() {
    const link = useLinkStore((state) => state.selectedLink);
    const [clickCount, setClickCount] = useState<number>(0);
    const [qrSrc, setQrSrc] = useState<string | null>(null);

    useEffect(() => {
        if (!link?.id) return;

        const fetchClickCount = async () => {
            try {
                const response = await api.post("click-count/" + link.id);
                setClickCount(response.data);
            } catch (err) {
                console.error("Failed to fetch click count", err);
            }
        };

        const fetchQRCode = async () => {
            try {
                const response = await api.post(`qr-code/${link.id}`, null, {
                    responseType: "arraybuffer",
                });

                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                    )
                );

                setQrSrc(`data:image/png;base64,${base64}`);
            } catch (err) {
                console.error("Failed to fetch QR code", err);
            }
        };

        fetchQRCode();
        fetchClickCount();
    }, [link?.id]);

    if (!link) return <p className="text-red-500">No link selected.</p>;

    return (
        <div className="flex flex-wrap gap-4 bg-gray-300 rounded-lg p-4 shadow-md w-2/3">
            <div className="flex flex-wrap gap-4">
                <Field label="Main Link" value={link.raw_link}/>
                <Field label="New Path" value={link.new_path}/>
                <Field label="New Domain" value={link.new_domain}/>
                <Field label="New URL" value={link.new_url}/>
                <Field label="Created At" value={link.created_at}/>
                <Field label="Tag" value={link.tag}/>
                <Field label="Start Expiration" value={link.start_expiration}/>
                <Field label="End Expiration" value={link.end_expiration}/>
                <Field
                    label="Private Status"
                    value={link.private_status ? "Private" : "Public"}
                />
                <Field label="Title" value={link.title}/>
                <Field label="Clicked Count" value={clickCount.toString()}/>
            </div>

            <div className="bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px] ">
                QR Code:
                <div className="ml-1 flex items-center bg-blue-300 px-2 rounded-2xl ">
                    <a href={qrSrc || undefined} download="qr-code.png">
                        <img
                            src={qrSrc || undefined}
                            alt="QR Code"
                            className="w-[100px] h-[100px] object-contain cursor-pointer "
                        />
                    </a>
                </div>
            </div>

        </div>
    );
}

function Field({label, value}: { label: string; value?: string | null }) {
    return (
        <div className="bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]">
            {label}:
            <div className="ml-1 flex items-center bg-blue-300 px-2 rounded-2xl overflow-hidden">
                {value || "-"}
            </div>
        </div>
    );
}
