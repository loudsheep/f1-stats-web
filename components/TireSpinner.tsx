"use client";

import Image from "next/image";
import React from "react";

type TireSpinnerProps = {
    size?: number; // since it's square, just one dimension
};

export default function TireSpinner({ size }: TireSpinnerProps) {
    return (
        <div className="animate-spin" style={{ width: size, height: size }}>
            <Image
                src="/tire_red.svg"
                alt="Loading..."
                width={size}
                height={size}
                priority
            />
        </div>
    );
}
