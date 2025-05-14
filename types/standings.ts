export type DriverPointsInfo = {
    position: number;
    positionText: string;
    points: number;
    wins: number;
    driverId: string;
    driverNumber: number;
    driverCode: string;
    driverUrl: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string; // ISO date string
    driverNationality: string;
    constructorIds: string[];
    constructorUrls: string[];
    constructorNames: string[];
    constructorNationalities: string[];
};

export type ConstructorPointsInfo = {
    position: number;
    positionText: string;
    points: number;
    wins: number;
    constructorId: string;
    constructorUrl: string;
    constructorName: string;
    constructorNationality: string;
};