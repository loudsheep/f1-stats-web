export type CircuitInfo = {
    lastWins: {
        position: number,
        positionText: string,
        points: number,
        laps: number,
        driverId: string,
        driverNumber: string,
        driverUrl: string,
        givenName: string,
        familyName: string,
        driverNationality: string,
        constructorId: string,
        totalRaceTimeMillis: number,
        fastestLapAvgSpeed: number,
    }[],
    info: {
        circuitId: string,
        circuitUrl: string,
        circuitName: string,
        lat: number,
        long: number,
        locality: string,
        country: string,
    }
}