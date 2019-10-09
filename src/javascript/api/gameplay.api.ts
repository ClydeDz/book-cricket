import { GameplayEngine } from "../engine/gameplay.engine";
import { PlayerConstant } from "../constant/player.constant";
import { ScorecardPlayer, Scorecard, RunScored, GamePanel } from "../model/game.model";
import { GameConstant } from "../constant/game.constant";

export class GameplayAPI {
    private gameplayEngine: GameplayEngine = new GameplayEngine();
    private playerConstant: PlayerConstant = new PlayerConstant();
    private gameConstant: GameConstant = new GameConstant();

    generateTeam(teamSize: number): Array<ScorecardPlayer> {
        let allPlayers: any = this.playerConstant.allPlayers();
        let randomTeam: any = this.gameplayEngine.getRandomPlayers(allPlayers, teamSize);
        let team: Array<ScorecardPlayer> =[];
        for(let i:number=0; i< randomTeam.length; i++) {
            team.push(allPlayers[i]);
        }
        return team;
    }

    getTargetScore(): number {
        return this.gameplayEngine.getTargetScore(this.gameConstant.POSSIBLE_RUNS, this.gameConstant.TOTAL_BALLS);
    }

    getRunScored(): RunScored {
        let allowedRuns: number[] = this.gameConstant.POSSIBLE_RUNS;
        let runScored: number = allowedRuns[Math.floor(Math.random() * allowedRuns.length)];
        let bookPagePrefix: string = (this.gameplayEngine.getBookPageNumber(
            this.gameConstant.BOOK_STARTING_PAGE_NUMBER, this.gameConstant.BOOK_ENDING_PAGE_NUMBER)).toString();

        return { display: bookPagePrefix + runScored, actual: runScored };
    }

    isGameOver(playerScorecard: Scorecard, cpuScorecard: Scorecard): boolean {
        let didPlayerWin = this.didPlayerWin(playerScorecard, cpuScorecard);
        let allBallsPlayed = this.allBallsPlayed(playerScorecard);
        let allWicketsFallen = this.allWicketsFallen(playerScorecard);

        return didPlayerWin || allBallsPlayed || allWicketsFallen;
    }

    didPlayerWin(playerScorecard: Scorecard, cpuScorecard: Scorecard): boolean {
        return playerScorecard.runs > cpuScorecard.runs;
    }

    allBallsPlayed(playerScorecard: Scorecard): boolean {
        return playerScorecard.balls >= this.gameConstant.TOTAL_BALLS;
    }

    allWicketsFallen(playerScorecard: Scorecard): boolean {
        return playerScorecard.wickets >= this.gameConstant.TEAM_SIZE;
    }

    getScorePanelImage(gamePanelData: GamePanel): string {
        let imageIdentifier = this.gameplayEngine.getRandomNumberWithinRange(
            this.gameConstant.PANELS_STARTING_IMAGE_ID, this.gameConstant.PANELS_ENDING_IMAGE_ID);
        
        if(gamePanelData.isResultsMode && gamePanelData.isWinner){
            return `${this.gameConstant.VICTORY_IMAGE_PREFIX}-${imageIdentifier}`;
        }
        if(gamePanelData.isResultsMode && !gamePanelData.isWinner){
            return `${this.gameConstant.LOST_IMAGE_PREFIX}-${imageIdentifier}`;
        }
        if(gamePanelData.isDuckOut){
            return `${this.gameConstant.DUCKOUT_IMAGE_PREFIX}-${imageIdentifier}`;
        }

        let imageName = gamePanelData.runScored === 0 ? this.gameConstant.OUT_IMAGE_PREFIX : 
            (gamePanelData.runScored === 2 ? this.gameConstant.TWO_RUNS_IMAGE_PREFIX :
                (gamePanelData.runScored === 4 ? this.gameConstant.FOUR_RUNS_IMAGE_PREFIX : 
                    (gamePanelData.runScored === 6 ? this.gameConstant.SIX_RUNS_IMAGE_PREFIX : this.gameConstant.EIGHT_RUNS_IMAGE_PREFIX)
                )
            );
        return `${imageName}-${imageIdentifier}`;
    }

}