export class GameConstant {
    readonly TEAM_SIZE: number = 5;
    readonly NUMBER_OF_TEAMS: number = 2;
    readonly TOTAL_BALLS: number = 30;
    readonly POSSIBLE_RUNS: number[] = [0, 2, 4, 6, 8];
    readonly BOOK_STARTING_PAGE_NUMBER: number = 0;
    readonly BOOK_ENDING_PAGE_NUMBER: number = 99; // This will be suffixed with a random number from possible runs
    readonly STATS_ROTATION_TIMER: number = 5000; // In milliseconds
    readonly GAME_RESULTS_TIMER: number = 3000; // In milliseconds
    readonly CENTRAL_SCREEN_TIMER: number = 3500; // In milliseconds
    readonly STATS_WICKET_NOTATION: string = "W"; 
    
    // ADVERTISEMENTS
    readonly ADS_IMAGE_LOCATION: string = "./src/images/assets/ads/ad-"; 
    readonly ADS_IMAGE_EXTENSION: string = ".jpg"; 
    readonly ADS_STARTING_IMAGE_ID: number = 1;
    readonly ADS_ENDING_IMAGE_ID: number = 4;
}