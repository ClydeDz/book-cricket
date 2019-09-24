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

    getRunScored(): number {
        return 2;
    }

    isGameOver(ballsPlayed: number): boolean {
        return ballsPlayed >= this.gameConstant.totalBalls;
    }

    updatePlayerScorecard(playerScorecard: Scorecard, cpuScorecard: Scorecard, runScored: number): Scorecard {
        let targetRuns: number = this.computationEngine.targetRuns(cpuScorecard.runs);
        let totalOvers: number = this.computationEngine.ballsToOvers(this.gameConstant.totalBalls);

        playerScorecard.players =  this.updatePlayerScorecardPlayers(playerScorecard.players, runScored, playerScorecard.wickets);
        playerScorecard.balls = ++playerScorecard.balls;
        playerScorecard.wickets = runScored === 0 ? ++playerScorecard.wickets: playerScorecard.wickets;
        playerScorecard.runs = playerScorecard.runs + runScored;
        playerScorecard.overs = this.computationEngine.ballsToOvers(playerScorecard.balls);
        playerScorecard.currentRunRate = this.computationEngine.runRate(playerScorecard.runs, playerScorecard.overs);
        playerScorecard.requiredRunRate = this.computationEngine.requiredRunRate(
            playerScorecard.runs,playerScorecard.balls,targetRuns,totalOvers);
        playerScorecard.projectedScore = this.computationEngine.projectedScore(
            playerScorecard.runs, playerScorecard.overs, playerScorecard.currentRunRate, totalOvers
        );

        return playerScorecard;
    }

    updatePlayerScorecardPlayers(players: Array<ScorecardPlayer>, runScored: number, currentPlayer: number): Array<ScorecardPlayer> {
        let playerOnStrike: ScorecardPlayer = players[currentPlayer];
        playerOnStrike.runs = playerOnStrike.runs + runScored;
        playerOnStrike.balls = ++playerOnStrike.balls;
        playerOnStrike.overs = this.computationEngine.ballsToOvers(playerOnStrike.balls);
        playerOnStrike.strikeRate = this.computationEngine.battingStrikeRate(playerOnStrike.runs, playerOnStrike.balls);

        players[currentPlayer] = playerOnStrike;
        return players;
    }
}