import { Event } from "@/types/schedule";

export default async function Schedule() {
    const res = await fetch(process.env.BACKEND_URL + "/api/schedule");
    const schedule: Event[] = await res.json();

    return (
        <div className="flex flex-col justify-center items-center mx-auto ">
            <h1 className="text-3xl">Schedule:</h1>

            <div className="w-[60%] p-10">
                {schedule.map((event, idx) => (
                    <div key={idx} className={"my-2 p-2 flex flex-row items-center justify-between border border-gray-400 " + (new Date(event.EventDate) < new Date() ? "grayscale" : "")}>
                        {/* <div style={{backgroundImage: `url('https://flagsapi.com/${event.CountryCode}/flat/32.png)`}}> */}
                        <img src={`https://countryflagsapi.netlify.app/flag/${event.CountryCode}.svg`} alt="" className="max-w-10" />
                        {/* </div> */}


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
                ))}
            </div>
        </div>
    )
}
