import DynamicSvg from "@/components/DynamicSvg";
import SessionTime from "@/components/SessionTime";
import { WeekendFormatConventional } from "@/components/WeekendFormatConventional";
import { WeekendFormatSprint } from "@/components/WeekendFormatSprint";
import { CircuitInfo } from "@/types/circuit";
import { Event } from "@/types/schedule";
import { locationToTrackName } from "@/util/tracks";
import Image from "next/image";
import WeekendCountdown from "./WeekendCountdown";

type FormatAndLocationProps = {
    nextEvent: Event,
    circuitInfo?: CircuitInfo
};

const formatDayAndMonth = (sessionDate: string) => {
    const date = new Date(sessionDate);
    
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    const month = formatter.format(date);

    return `${date.getDate()} ${month}`
}

const sessionKeys = [1, 2, 3, 4, 5] as const;

export default function FormatAndLocationSummary({ nextEvent, circuitInfo }: FormatAndLocationProps) {
    return (
        <>
            <div className="p-5 w-full sm:w-3/4 lg:w-2/3 2xl:w-1/2 flex flex-col md:grid grid-cols-2 grid-rows-1 gap-4">
                <WeekendCountdown {...nextEvent} />

                <div className="flex gap-2 justify-center items-center bg-gray-600/20 p-5 rounded-md text-xl">
                    <div>
                        {formatDayAndMonth(nextEvent.Session1Date)}
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                        {formatDayAndMonth(nextEvent.Session5Date)}
                    </div>
                </div>
            </div>

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

            {circuitInfo && (
                <>
                    <span className="w-full sm:w-3/4 lg:w-2/3 2xl:w-1/2 pl-5 text-xl mt-10">Circuit info</span >
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
                </>
            )
            }
        </>
    )
}
