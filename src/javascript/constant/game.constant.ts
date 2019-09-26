export class GameConstant {
    readonly teamSize: number = 5;
    readonly numberOfTeams: number = 2;
    readonly totalBalls: number = 6;
    readonly possibleRuns: number[] = [0, 2, 4, 6, 8];
    readonly bookStartingPageNumber: number = 0;
    readonly bookEndingPageNumber: number = 99; // this will be suffixed with a random number from possible runs
}