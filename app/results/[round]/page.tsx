import { RaceResult, SessionResult } from "@/types/results";
import { Event } from "@/types/schedule";
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

            <div className="flex flex-col w-1/2 gap-2">
                <div className="flex gap-2 justify-between mb-10">
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
                        className="flex-1 px-5 py-2 flex justify-between"
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
