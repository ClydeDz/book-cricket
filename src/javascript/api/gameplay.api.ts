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
        return this.gameplayEngine.getTargetScore(this.gameConstant.possibleRuns, this.gameConstant.totalBalls);
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
        let allowedRuns: number[] = this.gameConstant.possibleRuns;
        return allowedRuns[Math.floor(Math.random() * allowedRuns.length)];
    }

    isGameOver(ballsPlayed: number): boolean {
        return ballsPlayed >= this.gameConstant.totalBalls;
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
        playerScorecard.currentRunRate = this.computationEngine.runRate(playerScorecard.runs, playerScorecard.overs);
        playerScorecard.requiredRunRate = this.computationEngine.requiredRunRate(
            playerScorecard.runs,playerScorecard.balls,targetRuns,totalOvers);
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