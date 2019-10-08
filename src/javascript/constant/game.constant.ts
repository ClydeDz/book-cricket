export class GameConstant {
    readonly teamSize: number = 5;
    readonly numberOfTeams: number = 2;
    readonly totalBalls: number = 30;
    readonly possibleRuns: number[] = [0, 2, 4, 6, 8];
    readonly bookStartingPageNumber: number = 0;
    readonly bookEndingPageNumber: number = 99; // This will be suffixed with a random number from possible runs
    readonly statsRotationTimer: number = 5000; // In milliseconds
    readonly gameResultsTimer: number = 3000; // In milliseconds
    readonly centralScreenContentTimer: number = 3500; // In milliseconds
    readonly statsWicketNotation: string = "W"; 
}