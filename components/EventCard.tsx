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
};

export default function EventCard({
    CountryCode,
    Location,
    EventDate,
    EventName,
    Season,
    RoundNumber
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
            </div>
        </a>
    );
}
