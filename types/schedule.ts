export type Event = {
    Season: number,
    RoundNumber: number;
    Country: string;
    Location: string;
    OfficialEventName: string;
    EventDate: string;
    EventName: string;
    EventFormat: "testing" | "conventional" | "sprint_qualifying" | "sprint" | "sprint_shootout";
    CountryCode: string;
    CircuitId: string;

    Session1: string;
    Session1Date: string; // Local time with timezone offset
    Session1DateUtc: string; // UTC ISO date string

    Session2: string;
    Session2Date: string;
    Session2DateUtc: string;

    Session3: string;
    Session3Date: string;
    Session3DateUtc: string;

    Session4: string;
    Session4Date: string;
    Session4DateUtc: string;

    Session5: string;
    Session5Date: string;
    Session5DateUtc: string;

    F1ApiSupport: boolean;
};