import { useEffect, useState } from "react";
import { useLinkStore } from "./LinkView/store/useLinkStore.ts";
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
        <div className="w-full max-w-5xl mx-auto bg-gray-300 p-4 rounded-lg shadow-md">
            <div className="flex flex-wrap gap-4">
                <Field label="Main Link" value={link.raw_link} />
                <Field label="New Path" value={link.new_path} />
                <Field label="New Domain" value={link.new_domain} />
                <Field label="New URL" value={link.new_url} />
                <Field label="Created At" value={link.created_at} />
                <Field label="Tag" value={link.tag} />
                <Field label="Start Expiration" value={link.start_expiration} />
                <Field label="End Expiration" value={link.end_expiration} />
                <Field label="Private Status" value={link.private_status ? "Private" : "Public"} />
                <Field label="Title" value={link.title} />
                <Field label="Clicked Count" value={clickCount.toString()} />
            </div>

            <div className="mt-6">
                <h2 className="font-bold mb-2">QR Code:</h2>
                <div className="bg-blue-400 p-4 rounded-2xl flex justify-center items-center w-fit">
                    {qrSrc ? (
                        <a href={qrSrc} download="qr-code.png">
                            <img
                                src={qrSrc}
                                alt="QR Code"
                                className="w-[120px] h-[120px] object-contain cursor-pointer"
                            />
                        </a>
                    ) : (
                        <p className="text-white">Loading QR Code...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function Field({ label, value }: { label: string; value?: string | null }) {
    return (
        <div className="bg-blue-400 p-2 rounded-2xl flex flex-col min-w-[200px] max-w-full break-words overflow-auto">
            <span className="font-semibold text-white">{label}:</span>
            <div className="mt-1 bg-blue-300 px-2 py-1 rounded-xl text-sm text-black break-all whitespace-pre-wrap">
                {value || "-"}
            </div>
        </div>
    );
}
