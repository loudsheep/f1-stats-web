import DynamicSvg from "@/components/DynamicSvg";
import { Event } from "@/types/schedule";
import { locationToTrackName } from "@/util/tracks";
import { Audiowide } from "next/font/google";

// 12h long cache
export const revalidate = 43200;

export const audioWide = Audiowide({
    weight: ['400']
});

export default async function Home() {
    const res = await fetch(process.env.BACKEND_URL + "/api/remaining");
    const remaining: Event[] = await res.json();

    const nextEvent = remaining.length > 0 ? remaining[0] : null;

    if (nextEvent == null) {
        return <div>No more events remaining this season</div>
    }

    return (
        <div className="flex flex-col justify-center items-center mx-auto gap-3">
            <div className={"text-3xl p-5 " + audioWide.className}>
                <span className="text-red-500">Next race: </span>
                {nextEvent.OfficialEventName}
            </div>

            {/* <img src={`https://countryflagsapi.netlify.app/flag/${nextEvent.CountryCode}.svg`} alt="" className="max-h-32" /> */}

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
                    className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-25 pointer-events-none rounded-2xl"
                    style={{
                        backgroundImage: `url(https://countryflagsapi.netlify.app/flag/${nextEvent.CountryCode}.svg)`
                    }}
                />

                {/* SVG Map - fills parent */}
                <DynamicSvg
                    url={`tracks/${locationToTrackName(nextEvent.Location)}.svg`}
                    className="absolute inset-0 max-h-full max-w-full [&>path]:stroke-white z-1 p-5"
                />

            </div>


        </div>
    );
}
