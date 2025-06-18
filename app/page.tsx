import DynamicSvg from "@/components/DynamicSvg";
import SessionTime from "@/components/SessionTime";
import { WeekendFormatConventional } from "@/components/WeekendFormatConventional";
import { WeekendFormatSprint } from "@/components/WeekendFormatSprint";
import { CircuitInfo } from "@/types/circuit";
import { Event } from "@/types/schedule";
import { locationToTrackName } from "@/util/tracks";
import { Audiowide } from "next/font/google";
import Image from "next/image";

// 12h long cache
export const revalidate = 43200;

const audioWide = Audiowide({
    subsets: ["latin"],
    weight: ["400"],
});

const sessionKeys = [1, 2, 3, 4, 5] as const;

export default async function Home() {
    const res = await fetch(process.env.BACKEND_URL + "/api/schedule");
    const schedule: Event[] = await res.json();
    const remaining = schedule.filter(
        (e) => new Date(e.EventDate) >= new Date()
    );

    const nextEvent = remaining.length > 0 ? remaining[0] : null;

    if (nextEvent == null) {
        return <div className="text-center text-xl">No more events remaining this season</div>;
    }

    const resCircuit = await fetch(process.env.BACKEND_URL + `/api/circuit/${nextEvent.CircuitId}/${nextEvent.Season}/${nextEvent.RoundNumber}`);
    const circuitInfo: CircuitInfo = await resCircuit.json();

    return (
        <div
            className={
                "flex flex-col justify-center items-center mx-auto " +
                audioWide.className
            }
        >
            <div className="text-3xl p-5">
                <span className="text-red-500">Next race: </span>
                {nextEvent.OfficialEventName}
            </div>

            <span className="text-2xl my-5">
                {new Date(nextEvent.Session1Date).toLocaleDateString()} -{" "}
                {new Date(nextEvent.Session5Date).toLocaleDateString()}
            </span>

            <div className="p-5 w-full sm:w-3/4 lg:w-2/3 2xl:w-1/2 flex flex-col md:grid grid-cols-2 grid-rows-4 gap-4">
                <div className="">
                    {nextEvent.EventFormat.startsWith("sprint") ? (
                        <WeekendFormatSprint />
                    ) : (
                        <WeekendFormatConventional />
                    )}
                </div>

                <div className="row-span-4">
                    <div className="relative w-full">
                        <div className="opacity-25 pointer-events-none">
                            <Image
                                src={`https://countryflagsapi.netlify.app/flag/${nextEvent.CountryCode}.svg`}
                                className="w-full rounded-2xl"
                                alt="Country flag"
                                width={1000}
                                height={1000}
                            ></Image>
                        </div>

                        <DynamicSvg
                            url={`/tracks/${locationToTrackName(
                                nextEvent.Location
                            )}.svg`}
                            className="absolute inset-0 h-full w-full [&>path]:stroke-white z-1 p-5"
                        />
                    </div>
                </div>

                <div className="row-span-3 flex flex-col gap-2">
                    {sessionKeys.map((idx) => {
                        const sessionKey = `Session${idx}` as keyof Event;
                        const dateKey = `Session${idx}Date` as keyof Event;

                        return (
                            <SessionTime
                                key={idx}
                                sessionName={nextEvent[sessionKey] as string}
                                sessionDateUtc={
                                    new Date(nextEvent[dateKey] as string)
                                }
                            ></SessionTime>
                        );
                    })}
                </div>
            </div>

            {/* TODO */}
            <span className="w-full sm:w-3/4 lg:w-2/3 2xl:w-1/2 pl-5 text-xl mt-10">Circuit info</span>
            <div className="p-5 w-full sm:w-3/4 lg:w-2/3 2xl:w-1/2 flex flex-col md:grid grid-cols-2 grid-rows-4 gap-4">

                <div className="bg-red-500/25 py-1 pl-2 pr-3 border-l-3 border-red-500 flex items-center">
                    <a className="text-lg flex items-center underline cursor-pointer" target="_blank" href={circuitInfo.info.circuitUrl}>
                        {circuitInfo.info.circuitName}
                        <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>
                            open_in_new
                        </span>
                    </a>
                </div>

                <div className="bg-red-500/25 py-1 pl-2 pr-3 border-l-3 border-red-500 flex items-center">
                    <a className="text-lg flex items-center underline cursor-pointer" target="_blank" href={`https://www.google.com/maps/place/${circuitInfo.info.lat},${circuitInfo.info.long}`}>
                        {circuitInfo.info.locality}, {circuitInfo.info.country}
                        <span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>
                            pin_drop
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}
