'use client';

import { useEffect, useState } from 'react';

type DynamicSvgProps = {
    url: string; // e.g., "circle.svg"
    className?: string; // Tailwind classes
};

export default function DynamicSvg({ url, className = '' }: DynamicSvgProps) {
    const [svgContent, setSvgContent] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error('Fetch failed');
                let text = await res.text();

                // Inject class into <svg> tag
                text = text.replace(
                    /<svg([^>]+?)>/,
                    `<svg$1 class="${className}">`
                );

                setSvgContent(text);
            } catch (err) {
                console.error(`Error fetching ${url}:`, err);
                setError(true);
            }
        };

        fetchSvg();
    }, [url, className]);

    if (error) return <div className="text-red-500">Error loading SVG</div>;
    if (!svgContent) return <div className="animate-pulse text-gray-400">Loading...</div>;

    return (
        <div
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
}
