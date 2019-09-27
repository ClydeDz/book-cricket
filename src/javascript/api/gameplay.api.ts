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

    isGameOver(ballsPlayed: number): boolean {
        return ballsPlayed >= this.gameConstant.totalBalls;
    }

    didPlayerWin(playerScorecard: Scorecard, cpuScorecard: Scorecard): boolean {
        return playerScorecard.runs > cpuScorecard.runs;
    }

}