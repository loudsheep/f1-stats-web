import { ConstructorPointsInfo, DriverPointsInfo } from "@/types/standings";
import React from "react";

// 12h long cache
export const revalidate = 43200;

export default async function Standings() {
    const res = await fetch(process.env.BACKEND_URL + "/api/standings/drivers");
    const drivers: DriverPointsInfo[] = await res.json();

    const res2 = await fetch(
        process.env.BACKEND_URL + "/api/standings/constructors"
    );
    const constructors: ConstructorPointsInfo[] = await res2.json();

    return (
        <div className="flex flex-col justify-center items-center mx-auto ">
            <h1 className="text-3xl">Drivers:</h1>

            <div className="w-[60%] p-10">
                {drivers.map((driver, idx) => (
                    <div
                        key={idx}
                        className="my-2 flex flex-row items-center justify-between"
                    >
                        <span>{driver.positionText}.</span>

                        <a
                            href={driver.driverUrl}
                            className="underline  "
                            target="_blank"
                        >
                            {driver.givenName} {driver.familyName} -{" "}
                            {driver.driverCode}
                        </a>

                        <span>{driver.points}</span>
                    </div>
                ))}
            </div>

            <h1 className="text-3xl">Constructors:</h1>

            <div className="w-[60%] p-10">
                {constructors.map((constructor, idx) => (
                    <div
                        key={idx}
                        className="my-2 flex flex-row items-center justify-between"
                    >
                        <span>{constructor.positionText}.</span>

                        <a
                            href={constructor.constructorUrl}
                            className="underline  "
                            target="_blank"
                        >
                            {constructor.constructorName}
                        </a>

                        <span>{constructor.points}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
