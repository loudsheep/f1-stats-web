export type Event = {
    RoundNumber: number;
    Country: string;
    Location: string;
    OfficialEventName: string;
    EventDate: string;
    EventName: string;
    EventFormat: "testing" | "conventional" | "sprint_qualifying" | "sprint" | "sprint_shootout";
    CountryCode: string;
};
