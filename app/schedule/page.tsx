import DynamicSvg from "@/components/DynamicSvg";
import { Event } from "@/types/schedule";
import { locationToTrackName } from "@/util/tracks";

const calculateDays = (startDate: string, endDate: string) => {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let timeDifference = Math.abs(end.getTime() - start.getTime());
    let daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
}

export default async function Schedule() {
    const res = await fetch(process.env.BACKEND_URL + "/api/schedule");
    const schedule: Event[] = await res.json();

    return (
        <div className="flex flex-col justify-center items-center mx-auto ">
            <h1 className="text-3xl">Schedule:</h1>

            <div className="w-[60%] p-10">
                {schedule.map((event, idx) => (
                    <div key={idx}>
                        <div className={"my-2 flex flex-row items-center justify-between bg-gradient-to-r from-[#580000] to-[#000000] border-red-900 " + (new Date(event.EventDate) < new Date() ? "grayscale  p-1 h-5" : " p-2 h-10")}>
                            <div className="h-full flex gap-5">
                                <img src={`https://countryflagsapi.netlify.app/flag/${event.CountryCode}.svg`} alt="" className="max-h-full max-w-10" />

                                <DynamicSvg url={`/tracks/${locationToTrackName(event.Location)}.svg`} className="max-h-full max-w-10 [&>path]:stroke-white [&>path]:stroke-[30]"></DynamicSvg>
                            </div>

                            <span className=" capitalize">
                                {event.OfficialEventName.toLocaleLowerCase()}

                                {event.EventFormat == "sprint_qualifying" && (
                                    <span className="rounded-md px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">Sprint</span>
                                )}
                            </span>

                            <span>
                                {new Date(event.EventDate).toLocaleDateString()}
                            </span>
                        </div>

                        {/* Seperated events that are over a week apart from eac other */}
                        {(idx + 1 < schedule.length && calculateDays(event.EventDate, schedule[idx + 1].EventDate) > 9) && (
                            <div className="">
                                &nbsp;
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
