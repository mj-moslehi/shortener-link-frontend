import { Click } from "../pages/clicked/Clicked.tsx";

interface ClickDetailProps {
    click: Click;
    key:number;
}

export default function ClickDetail({ click }: ClickDetailProps) {
    const details: { label: string; value: string }[] = [
        { label: "Country", value: click.country },
        { label: "Region", value: click.region },
        { label: "City", value: click.city },
        { label: "Road", value: click.road },
        { label: "Neighborhood", value: click.neighborhood },
        { label: "Clicked IP", value: click.clicked_ip },
        { label: "Device", value: click.device },
        { label: "Browser", value: click.browser },
        { label: "Referrer Type", value: click.referrer_type },
        { label: "Date", value: click.date },
    ];

    return (
        <div className={`w-full max-w-5xl mx-auto bg-gray-300 p-4 rounded-lg shadow-md my-5`}>
            <div className="flex flex-wrap gap-4">
                {details.map(({ label, value }) => (
                    <div
                        key={label}
                        className="bg-blue-400 p-2 rounded-2xl flex flex-col min-w-[200px] max-w-full break-words overflow-auto"
                    >
                        <span className="font-semibold text-white">{label}:</span>
                        <div className="mt-1 bg-blue-300 px-2 py-1 rounded-xl text-sm text-black break-all whitespace-pre-wrap">
                            {value || "-"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
