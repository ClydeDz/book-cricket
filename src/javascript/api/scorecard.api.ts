import { GameplayEngine } from "../engine/gameplay.engine";
import { ScorecardPlayer, Scorecard } from "../model/game.model";
import { GameConstant } from "../constant/game.constant";
import { ComputationEngine } from "../engine/computation.engine";
import { GameplayAPI } from "./gameplay.api";

export class ScorecardAPI {
    private gameplayEngine: GameplayEngine = new GameplayEngine();
    private computationEngine: ComputationEngine = new ComputationEngine();
    private gameConstant: GameConstant = new GameConstant();
    private gameplayAPI: GameplayAPI = new GameplayAPI();

    initCPUScorecard(players: Array<ScorecardPlayer>): Scorecard {
        let cpuScorecard: Scorecard = new Scorecard();
        cpuScorecard.players = players;
        cpuScorecard.runs = this.gameplayAPI.getTargetScore();
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
    
    updatePlayerScorecard(playerScorecard: Scorecard, cpuScorecard: Scorecard, runScored: number): Scorecard {
        let targetRuns: number = this.computationEngine.targetRuns(cpuScorecard.runs);
        let totalOvers: number = this.computationEngine.ballsToOvers(this.gameConstant.totalBalls);
        
        let hasWicketFallen: boolean = runScored === 0;

        playerScorecard.players =  this.updatePlayerScorecardPlayers(playerScorecard.players, runScored,
            playerScorecard.wickets, cpuScorecard, playerScorecard.balls);
        playerScorecard.balls = ++playerScorecard.balls;
        playerScorecard.wickets = hasWicketFallen ? ++playerScorecard.wickets: playerScorecard.wickets;
        playerScorecard.runs = playerScorecard.runs + runScored;
        playerScorecard.overs = this.computationEngine.ballsToOvers(playerScorecard.balls);
        playerScorecard.overHistory = this.updatePlayerScorecardOverHistory(
            playerScorecard.overHistory, playerScorecard.overs, runScored);
        playerScorecard.currentRunRate = this.computationEngine.runRate(playerScorecard.runs, playerScorecard.overs);
        playerScorecard.requiredRunRate = this.computationEngine.requiredRunRate(
            playerScorecard.runs,playerScorecard.overs,targetRuns,totalOvers);
        playerScorecard.projectedScore = this.computationEngine.projectedScore(
            playerScorecard.runs, playerScorecard.overs, playerScorecard.currentRunRate, totalOvers
        );

        return playerScorecard;
    }

    updatePlayerScorecardPlayers(players: Array<ScorecardPlayer>, runScored: number,
        currentPlayer: number, cpuScorecard: Scorecard, totalBallsPlayed: number): Array<ScorecardPlayer> {
        let hasWicketFallen: boolean = runScored === 0;
        let playerOnStrike: ScorecardPlayer = players[currentPlayer];
        let currentOverFloored: number = this.gameplayEngine.getCurrentOver(
            this.computationEngine.ballsToOvers(totalBallsPlayed));

        playerOnStrike.runs = playerOnStrike.runs + runScored;
        playerOnStrike.balls = ++playerOnStrike.balls;
        playerOnStrike.wicketTakenBy = hasWicketFallen ? cpuScorecard.players[currentOverFloored].name : "";
        playerOnStrike.overs = this.computationEngine.ballsToOvers(playerOnStrike.balls);
        playerOnStrike.strikeRate = this.computationEngine.battingStrikeRate(playerOnStrike.runs, playerOnStrike.balls);

        players[currentPlayer] = playerOnStrike;
        return players;
    }

    updatePlayerScorecardOverHistory(overHistory: number[], oversPlayed: number, runsScored: number): number[] {
        let currentBall: number = this.gameplayEngine.getCurrentBall(oversPlayed);
        let ball = currentBall === 0 ? 5 : currentBall-1; // TODO: Move this to the engine and add comments
        overHistory = currentBall === 1 ? [0,0,0,0,0,0]: overHistory;        
        overHistory[ball] = runsScored;
        return overHistory;
    }

    updateCPUScorecard(cpuScorecard: Scorecard, runScored: number, playerScorecard: Scorecard): Scorecard {
        let currentOverFloored: number = this.gameplayEngine.getCurrentOver(
            this.computationEngine.ballsToOvers(playerScorecard.balls));
        let currentBowler: ScorecardPlayer = cpuScorecard.players[currentOverFloored];
        let hasWicketFallen: boolean = runScored === 0;

        currentBowler.runsGiven = hasWicketFallen ? currentBowler.runsGiven : currentBowler.runsGiven + runScored;
        currentBowler.wickets = hasWicketFallen ? ++currentBowler.wickets: currentBowler.wickets;
        currentBowler.balls = ++currentBowler.balls;
        currentBowler.economy = this.computationEngine.bowlingEconomy(currentBowler.balls, currentBowler.runsGiven);

        cpuScorecard.players[currentOverFloored] = currentBowler;
        return cpuScorecard;
    }
}