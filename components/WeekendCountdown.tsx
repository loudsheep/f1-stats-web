'use client'

import Countdown from "react-countdown";

type WeekendCountdownProps = {
    Session1Date: string,
    Session1: string,
    Session2Date: string,
    Session2: string,
    Session3Date: string,
    Session3: string,
    Session4Date: string,
    Session4: string,
    Session5Date: string,
    Session5: string,
};

type RendererProps = {
    total: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
};

const padNumberTwoDigits = (num: number) => {
    return (num + "").padStart(2, "0");
}

const TimerPart = ({ num, text }: { num: number, text: string }) => {
    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <h1 className="text-2xl">{padNumberTwoDigits(num)}</h1>
            <h2 className="text-xs text-white/30 uppercase">{text}</h2>
        </div>
    )
}

const renderer = ({ days, hours, minutes, seconds }: RendererProps) => {
    return (
        <div className="flex gap-10 px-10">
            <TimerPart num={days} text="Days"></TimerPart>

            <div className="w-[1px] border-r border-white/40"></div>

            <TimerPart num={hours} text="Hrs"></TimerPart>

            <div className="w-[1px] border-r border-white/40"></div>

            <TimerPart num={minutes} text="Mins"></TimerPart>
        </div>
    )
};

const sessionKeys = [1, 2, 3, 4, 5] as const;
const pickNextSession = (props: WeekendCountdownProps) => {
    let nextBestKey: any = sessionKeys[0];

    for (const idx of sessionKeys) {
        const dateKey = `Session${idx}Date` as keyof WeekendCountdownProps;
        // const nextKey = `Session${nextBestKey}Date` as keyof WeekendCountdownProps;

        if (new Date(props[dateKey]) > new Date()) {
            nextBestKey = idx;
            break;
            // continue
        }
    }

    return {
        date: new Date(props[`Session${nextBestKey}Date` as keyof WeekendCountdownProps]),
        sessionName: props[`Session${nextBestKey}` as keyof WeekendCountdownProps]
    }
};

export default function WeekendCountdown(props: WeekendCountdownProps) {
    const { date, sessionName } = pickNextSession(props);

    if (date.getTime() < Date.now()) return null;

    return (
        <div className="flex flex-col justify-center items-center bg-gray-600/20 p-5 rounded-md">
            <div className="flex-1 w-full border-b border-white/40 text-center mb-4 pb-2 text-2xl">{sessionName}</div>

            <Countdown className="flex-1" date={date} renderer={renderer} intervalDelay={5000}></Countdown>
        </div>
    )
}
