import { Event } from "@/types/schedule";

export default async function Schedule() {
    const res = await fetch(process.env.BACKEND_URL + "/api/schedule");
    const schedule: Event[] = await res.json();

    return (
        <div>
            <h1>Schedule:</h1>
            
            {schedule.map((event, idx) => (
                <div key={idx} className={event.EventFormat == "testing" ? "text-red-500" : event.EventFormat == "sprint_qualifying" ? "text-green-500" : ""}>
                    {event.RoundNumber} - {event.OfficialEventName} - {event.EventDate}
                </div>
            ))}
        </div>
    )
}
