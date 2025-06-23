import EventCard from "@/components/EventCard";
import { Event } from "@/types/schedule";
import { Audiowide } from "next/font/google";

// 12h long cache
export const revalidate = 43200;

const audioWide = Audiowide({
    subsets: ["latin"],
    weight: ["400"],
});

export default async function Schedule() {
    const res = await fetch(process.env.BACKEND_URL + "/api/schedule");
    const schedule: Event[] = await res.json();

    return (
        <div
            className={
                "flex flex-col justify-center items-center mx-auto gap-5 " +
                audioWide.className
            }
        >
            <div className="text-3xl p-5"><span className="text-red-500">Schedule</span> and <span className="text-red-500">results</span> for current season</div>

            <div className="grid w-full md:w-4/5 xl:w-3/4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-15 gap-x-4 p-5">
                {schedule.map((event, idx) => (
                    <EventCard key={idx} {...event}></EventCard>
                ))}
            </div>
        </div>
    );
}
