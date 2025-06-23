import Image from "next/image";
import DynamicSvg from "./DynamicSvg";
import { locationToTrackName } from "@/util/tracks";

type EventCardProps = {
    CountryCode: string;
    Location: string;
    EventDate: string;
    EventName: string;
    Season: number,
    RoundNumber: number,
    EventFormat: string,
    Session5Date: string,
};

export default function EventCard({
    CountryCode,
    Location,
    EventDate,
    EventName,
    Season,
    RoundNumber,
    Session5Date
}: EventCardProps) {
    return (
        <a href={`/results/${RoundNumber}`} className="">
            <div className="h-full flex flex-col justify-between">
                <div className="relative w-full">
                    <div className="opacity-25 pointer-events-none">
                        <Image
                            src={`https://countryflagsapi.netlify.app/flag/${CountryCode}.svg`}
                            className="w-full rounded-2xl object-fill"
                            alt="Country flag"
                            width={1000}
                            height={1000}
                        ></Image>
                    </div>

                    <DynamicSvg
                        url={`tracks/${locationToTrackName(Location)}.svg`}
                        className="absolute inset-0 h-full w-full [&>path]:stroke-white z-1 p-5"
                    />
                </div>

                <div>
                    <div className="text-xl">{EventName}</div>
                    <div className="text-xs">
                        {new Date(EventDate).toLocaleDateString()}
                    </div>
                </div>

                {/* Check if session 5 (race) has ended at lest 3h ago */}
                {new Date(Session5Date) < new Date(Date.now() - 1000 * 60 * 60 * 3) && (
                    <div className="flex">
                        <div className="flex items-center text-green-600 border-b border-green-600">See results
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </div>
                    </div>
                )}
            </div>
        </a>
    );
}
