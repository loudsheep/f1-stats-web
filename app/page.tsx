import DynamicSvg from "@/components/DynamicSvg";
import { Event } from "@/types/schedule";
import { locationToTrackName } from "@/util/tracks";

// 12h long cache
export const revalidate = 43200;

export default async function Home() {
    const res = await fetch(process.env.BACKEND_URL + "/api/remaining");
    const remaining: Event[] = await res.json();

    const nextEvent = remaining.length > 0 ? remaining[0] : null;

    if (nextEvent == null) {
        return <div>No more events remaining this season</div>
    }

    return (
        <div className="flex flex-col justify-center items-center mx-auto gap-3">
            <h1 className="text-3xl">Next race:</h1>

            <div className="border-4 p-5">
                {nextEvent.OfficialEventName}
            </div>

            <img src={`https://countryflagsapi.netlify.app/flag/${nextEvent.CountryCode}.svg`} alt="" className="max-h-32" />

            <span className="text-2xl">
                {new Date(nextEvent.EventDate).toLocaleDateString()}
            </span>

            {nextEvent.EventFormat.startsWith("sprint") && (
                <span className="border border-green-500 p-3 text-green-500">
                    SPRINT
                </span>
            )}

            <DynamicSvg url={`tracks/${locationToTrackName(nextEvent.Location)}.svg`} className="[&>path]:stroke-white w-[50%] mx-auto"></DynamicSvg>
        </div>
    );
}
