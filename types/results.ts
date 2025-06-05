export type RaceResult = {
    number: number;
    position: number;
    positionText: string;
    points: number;
    grid: number;
    laps: number;
    status: string;
    driverId: string;
    driverNumber: number;
    driverCode: string;
    driverUrl: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string; // ISO 8601 date string
    driverNationality: string;
    constructorId: string;
    constructorUrl: string;
    constructorName: string;
    constructorNationality: string;
    totalRaceTimeMillis: number | null;
    totalRaceTime: string | null;
    fastestLapRank: number | null;
    fastestLapNumber: number | null;
    fastestLapTime: string | null;
};

export type SessionResult = {
    DriverNumber: string,
    BroadcastName: string,
    Abbreviation: string,
    DriverId: string,
    TeamName: string,
    TeamColor: string,
    TeamId: string,
    FirstName: string,
    LastName: string,
    FullName: string,
    HeadshotUrl: string,
    CountryCode: string,
    Position: number,
    ClassifiedPosition: string,
    GridPosition: number,
    Q1: string | null,
    Q2: string | null,
    Q3: string | null,
    Time: string | null,
    Status: string,
    Points: number,
};