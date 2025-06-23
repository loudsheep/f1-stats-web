import DynamicSvg from "@/components/DynamicSvg";
import SessionTime from "@/components/SessionTime";
import { WeekendFormatConventional } from "@/components/WeekendFormatConventional";
import { WeekendFormatSprint } from "@/components/WeekendFormatSprint";
import { SessionResult } from "@/types/results";
import { Event } from "@/types/schedule";
import { locationToTrackName } from "@/util/tracks";
import { Audiowide } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";

const audioWide = Audiowide({
    subsets: ["latin"],
    weight: ["400"],
});

const getEventByRound = (round: number, events: Event[]) => {
    for (const event of events) {
        if (event.RoundNumber == round) return event;
    }
    return null;
};

const sessionKeys = [1, 2, 3, 4, 5] as const;

export default async function RoundResult({
    params,
}: {
    params: Promise<{ round: number }>;
}) {
    const { round } = await params;
    const season = new Date().getFullYear();

    const res2 = await fetch(process.env.BACKEND_URL + "/api/schedule");
    const schedule: Event[] = await res2.json();
    const eventInfo = getEventByRound(round, schedule);

    if (eventInfo == null) return notFound();

    const res = await fetch(
        `${process.env.BACKEND_URL}/api/results/${season}/${round}/Race`
    );
    const results: SessionResult[] = await res.json();

    const podium = results.slice(0, 3);
    const rest = results.slice(3);

    if (results.length == 0) {
        return (
            <div
                className={
                    "flex flex-col justify-center items-center mx-auto gap-5 " +
                    audioWide.className
                }
            >
                <div className="text-3xl p-5">
                    Looks like there are still
                    <span className="text-red-500"> no results </span>
                    for {eventInfo.EventName}
                </div>

                <span className="text-2xl">
                    {new Date(eventInfo.Session1Date).toLocaleDateString()} -{" "}
                    {new Date(eventInfo.Session5Date).toLocaleDateString()}
                </span>

                <div className="p-5 w-full sm:w-3/4 lg:w-2/3 2xl:w-1/2 flex flex-col md:grid grid-cols-2 grid-rows-4 gap-4">
                    <div className="">
                        {eventInfo.EventFormat.startsWith("sprint") ? (
                            <WeekendFormatSprint />
                        ) : (
                            <WeekendFormatConventional />
                        )}
                    </div>

                    <div className="row-span-4">
                        <div className="relative w-full">
                            <div className="opacity-25 pointer-events-none">
                                <Image
                                    src={`https://countryflagsapi.netlify.app/flag/${eventInfo.CountryCode}.svg`}
                                    className="w-full rounded-2xl"
                                    alt="Country flag"
                                    width={1000}
                                    height={1000}
                                ></Image>
                            </div>

                            <DynamicSvg
                                url={`/tracks/${locationToTrackName(
                                    eventInfo.Location
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
                                    sessionName={eventInfo[sessionKey] as string}
                                    sessionDateUtc={
                                        new Date(eventInfo[dateKey] as string)
                                    }
                                ></SessionTime>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div
            className={
                "flex flex-col justify-center items-center mx-auto gap-5 " +
                audioWide.className
            }
        >
            <div className="text-3xl p-5">
                <span className="text-red-500">Results for: </span>
                {eventInfo.EventName}
            </div>

            <div className="flex flex-col w-full lg:w-3/4 xl:w-1/2 px-1 gap-2">
                <div className="flex flex-col md:flex-row gap-2 justify-between mb-10">
                    {podium.map((result, idx) => (
                        <div
                            key={idx}
                            className="flex-1 flex py-2 bg-opacity-70 items-center"
                            style={{
                                backgroundColor: "#" + result.TeamColor + "77",
                            }}
                        >
                            <span className="ml-2 text-3xl">
                                {result.ClassifiedPosition}
                            </span>
                            <Image
                                src={result.HeadshotUrl}
                                width={50}
                                height={50}
                                alt="Driver headshot"
                            ></Image>
                            {result.FullName}
                        </div>
                    ))}
                </div>

                {rest.map((result, idx) => (
                    <div
                        key={idx}
                        className="flex-1 px-5 py-2 flex justify-between flex-wrap"
                        style={{
                            backgroundColor: "#" + result.TeamColor + "44",
                        }}
                    >
                        <div>
                            {result.ClassifiedPosition}. {result.FullName}
                        </div>

                        {result.Status == "Finished" && <div>+{result.Time}</div>}
                        {result.Status != "Finished" && <div className="text-gray-500">{result.Status}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
