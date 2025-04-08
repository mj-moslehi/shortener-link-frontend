import { Click } from "../pages/clicked/Clicked.tsx";

interface ClickDetailProps {
    click: Click;
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
        <div className="flex flex-wrap gap-4 bg-gray-300 rounded-lg p-4 shadow-md my-5 w-2/3">
            {details.map(({ label, value }) => (
                <div
                    key={label}
                    className="bg-blue-400 p-2 flex font-medium rounded-2xl my-3 min-w-[200px]"
                >
                    {label}:
                    <div className="ml-1 flex items-center bg-blue-300 px-2 rounded-2xl overflow-hidden">
                        {value}
                    </div>
                </div>
            ))}
        </div>
    );
}
