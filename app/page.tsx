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

            <div className="relative w-1/4 aspect-[16/9]"> {/* Maintain aspect ratio if needed */}
                {/* Flag overlay - fills entire parent */}
                <div
                    className="absolute inset-0 bg-no-repeat bg-cover bg-center mix-blend-multiply pointer-events-none z-10"
                    style={{
                        backgroundImage: `url(https://countryflagsapi.netlify.app/flag/${nextEvent.CountryCode}.svg)`
                    }}
                />

                {/* SVG Map - fills parent */}
                <DynamicSvg
                    url={`tracks/${locationToTrackName(nextEvent.Location)}.svg`}
                    className="absolute inset-0 w-full h-full [&>path]:fill-black [&>path]:stroke-white z-0"
                />
            </div>


        </div>
    );
}
