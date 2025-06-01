'use client'

type SessionTimeProps = {
    sessionName: string,
    sessionDateUtc: Date,
};

const formatTime = (date: Date) => {
    const h = (date.getHours() < 9 ? "0" : "") + date.getHours();
    const m = (date.getMinutes() < 9 ? "0" : "") + date.getMinutes();
    return `${h}:${m}`;
}

export default function SessionTime({ sessionName, sessionDateUtc }: SessionTimeProps) {
    const color = sessionDateUtc < new Date() ? "bg-green-500/20 border-green-700" : 'bg-gray-500/20 border-gray-700';

    return (
        <div className={"flex-1 flex justify-between items-center px-2 border-l-3 " + color}>
            <div>{sessionName}</div>
            <div>{formatTime(sessionDateUtc)}</div>
        </div>
    )
}
