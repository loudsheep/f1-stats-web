import React from 'react'

const contributors = [
    { name: "loudsheep", url: "https://github.com/loudsheep" },
    { name: "Sok205", url: "https://github.com/Sok205" }
];

export default function Footer() {
    return (
        <div className='w-full text-center p-5 flex justify-center flex-wrap'>
            Made with ❤️ by
            <div className='flex gap-2 ml-2 flex-wrap justify-center'>
                {contributors.map((value, idx) => (
                    <a href={value.url} className='underline' target='_blank'>{value.name}</a>
                ))}
            </div>
        </div>
    )
}
