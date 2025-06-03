import { RaceResult } from "@/types/results";

export default async function RoundResult({
    params,
}: {
    params: Promise<{ round: number }>;
}) {
    const { round } = await params;

    const res = await fetch(
        process.env.BACKEND_URL + "/api/results/current/" + round
    );
    const results: RaceResult[] = await res.json();

    return (
        <div>
            {results.map((result, idx) => (
                <div key={idx}>
                  {result.givenName} {result.familyName}
                </div>
            ))}
        </div>
    );
}
