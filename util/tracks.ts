export const locationToTrackName = (location: string): string => {
    return location.toLowerCase().replace(" ", "-");
}