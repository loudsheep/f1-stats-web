import FormatAndLocationSummary from "@/components/FormatAndLocationSummary";
import { CircuitInfo } from "@/types/circuit";
import { Event } from "@/types/schedule";
import { Audiowide } from "next/font/google";

// 12h long cache
export const revalidate = 43200;

const audioWide = Audiowide({
    subsets: ["latin"],
    weight: ["400"],
});

export default async function Home() {
    const res = await fetch(process.env.BACKEND_URL + "/api/schedule");
    const schedule: Event[] = await res.json();
    const remaining = schedule.filter(
        (e) => new Date(e.EventDate) >= new Date()
    );

    const nextEvent = remaining.length > 0 ? remaining[0] : null;

    if (nextEvent == null) {
        return <div
            className={
                "flex flex-col justify-center items-center mx-auto " +
                audioWide.className
            }
        >
            <h1 className="text-3xl mt-10"><span className="text-red-500">No more</span> events remaining this season</h1>
            <h2>See you soon, when next season starts!</h2>
        </div>;
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

            <FormatAndLocationSummary nextEvent={nextEvent} circuitInfo={circuitInfo} />
        </div>
    );
}
