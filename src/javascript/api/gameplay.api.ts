import { GameplayEngine } from "../engine/gameplay.engine";
import { PlayerConstant } from "../constant/player.constant";
import { ScorecardPlayer, Scorecard, RunScored } from "../model/game.model";
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
        return this.gameplayEngine.getTargetScore(this.gameConstant.possibleRuns, this.gameConstant.totalBalls);
    }

    getRunScored(): RunScored {
        let allowedRuns: number[] = this.gameConstant.possibleRuns;
        let runScored: number = allowedRuns[Math.floor(Math.random() * allowedRuns.length)];
        let bookPagePrefix: string = (this.gameplayEngine.getBookPageNumber(
            this.gameConstant.bookStartingPageNumber, this.gameConstant.bookEndingPageNumber)).toString();

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
        return playerScorecard.balls >= this.gameConstant.totalBalls;
    }

    allWicketsFallen(playerScorecard: Scorecard): boolean {
        return playerScorecard.wickets >= this.gameConstant.teamSize;
    }

    getScorePanelImage(score: number, isDuckOut: boolean): string {
        let imageIdentifier = this.gameplayEngine.getRandomNumberWithinRange(1,3);
        if(isDuckOut){
            return `duckout-${imageIdentifier}`;
        }

        let imageName = score === 0 ? "out" : 
            (score === 2 ? "two" :
                (score === 4 ? "four" : 
                    (score === 6 ? "six" : "eight")
                )
            );
        return `${imageName}-${imageIdentifier}`;
    }

}