import { ConstructorPointsInfo, DriverPointsInfo } from "@/types/standings";
import { Audiowide } from "next/font/google";
import React from "react";

// 12h long cache
export const revalidate = 43200;

const audioWide = Audiowide({
    subsets: ["latin"],
    weight: ["400"],
});

const getPositionStyle = (position: number) => {
    if (position == 1) return "border-l-[#d4af37] bg-linear-to-r from-[#d4af37bb] to-black to-45%";
    if (position == 2) return "border-l-[#c0c0c0] bg-linear-to-r from-[#c0c0c0bb] to-black to-45%";
    if (position == 3) return "border-l-[#CD7F32] bg-linear-to-r from-[#CD7F32bb] to-black to-45%";
};


export default async function Standings() {
    const res = await fetch(process.env.BACKEND_URL + "/api/standings/drivers");
    const drivers: DriverPointsInfo[] = await res.json();

    const res2 = await fetch(
        process.env.BACKEND_URL + "/api/standings/constructors"
    );
    const constructors: ConstructorPointsInfo[] = await res2.json();

    return (
        <div
            className={
                "flex flex-col justify-center items-center mx-auto " +
                audioWide.className
            }
        >

            <h1 className="text-3xl">Current <span className="text-red-500">drivers</span> standings:</h1>

            <div className="w-full md:w-5/6 lg:w-3/4 2xl:w-3/5 relative overflow-x-auto my-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xsuppercase border-b text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 hidden md:table-cell">
                                Car Number
                            </th>
                            <th scope="col" className="px-6 py-3 hidden lg:table-cell">
                                Nationality
                            </th>
                            <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                                Wins
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Points
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.map((driver, idx) => (
                            <tr key={idx} className={"border-b border-gray-700 " + getPositionStyle(driver.position)}>
                                <td className="px-6 py-3">
                                    {driver.positionText}
                                </td>
                                <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap text-white">
                                    <a href={driver.driverUrl} className="hover:underline" target="_blank">
                                        {driver.givenName} {driver.familyName}
                                    </a>
                                </th>
                                <td className="px-6 py-3 hidden md:table-cell">
                                    {driver.driverNumber}
                                </td>
                                <td className="px-6 py-3 hidden lg:table-cell">
                                    {driver.driverNationality}
                                </td>
                                <td className="px-6 py-3 hidden sm:table-cell">
                                    {driver.wins}
                                </td>
                                <td className="px-6 py-3 text-white">
                                    {driver.points}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h1 className="text-3xl mt-20">Current <span className="text-red-500">constructors</span> standings:</h1>

            <div className="w-full md:w-5/6 lg:w-3/4 2xl:w-3/5 relative overflow-x-auto my-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xsuppercase border-b text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 hidden sm:table-cell">
                                Wins
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Points
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {constructors.map((constructor, idx) => (
                            <tr key={idx} className={"border-b border-gray-700 " + getPositionStyle(constructor.position)}>
                                <td className="px-6 py-3">
                                    {constructor.positionText}
                                </td>
                                <th scope="row" className="px-6 py-3 font-medium whitespace-nowrap text-white">
                                    <a href={constructor.constructorUrl} className="hover:underline" target="_blank">
                                        {constructor.constructorName}
                                    </a>
                                </th>
                                <td className="px-6 py-3 hidden sm:table-cell">
                                    {constructor.wins}
                                </td>
                                <td className="px-6 py-3 text-white">
                                    {constructor.points}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
