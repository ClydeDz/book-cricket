import { GameplayEngine } from "../engine/gameplay.engine";
import { PlayerConstant } from "../constant/player.constant";
import { Player, ScorecardPlayer, Scorecard } from "../model/game.model";
import { GameConstant } from "../constant/game.constant";
import { ComputationEngine } from "../engine/computation.engine";

export class GameplayAPI {
    private gameplayEngine: GameplayEngine = new GameplayEngine();
    private computationEngine: ComputationEngine = new ComputationEngine();
    private playerConstant: PlayerConstant = new PlayerConstant();
    private gameConstant: GameConstant = new GameConstant();

    generateTeam(teamSize: number): Array<ScorecardPlayer> {
        let allPlayers: any = this.playerConstant.allPlayers();
        let randomTeam: any = this.gameplayEngine.getRandom(allPlayers, teamSize);
        let team: Array<ScorecardPlayer> =[];
        for(let i:number=0; i< randomTeam.length; i++) {
            team.push(allPlayers[i]);
        }
        return team;
    }

    getTargetScore(): number {
        return 65;
    }

    initCPUScorecard(players: Array<ScorecardPlayer>): Scorecard {
        let cpuScorecard: Scorecard = new Scorecard();
        cpuScorecard.players = players;
        cpuScorecard.runs = this.getTargetScore();
        cpuScorecard.balls = this.gameConstant.totalBalls;
        cpuScorecard.overs = this.computationEngine.ballsToOvers(this.gameConstant.totalBalls);
        cpuScorecard.currentRunRate = this.computationEngine.runRate(cpuScorecard.runs, cpuScorecard.overs);
        return cpuScorecard;
    }

    initPlayerScorecard(players: Array<ScorecardPlayer>, cpuScorecard: Scorecard): Scorecard {
        let targetRuns: number = this.computationEngine.targetRuns(cpuScorecard.runs);
        let totalOvers: number = this.computationEngine.ballsToOvers(this.gameConstant.totalBalls);

        let playerScorecard: Scorecard = new Scorecard();
        playerScorecard.players = players; 
        playerScorecard.requiredRunRate = this.computationEngine.requiredRunRate(0,0,targetRuns,totalOvers);

        return playerScorecard;
    }
}