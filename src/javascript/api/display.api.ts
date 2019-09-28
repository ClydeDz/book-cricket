import * as jQuery from "jquery";
import { GameplayAPI } from "./gameplay.api";
import { Player, ScorecardPlayer, Scorecard, RunScored } from "../model/game.model";
import { GameConstant } from "../constant/game.constant";
import { ScorecardAPI } from "./scorecard.api";
import { ComputationEngine } from "../engine/computation.engine";
import { GameplayEngine } from "../engine/gameplay.engine";

export class DisplayAPI {   
    private playerScorecard: Scorecard = new Scorecard();
    private cpuScorecard: Scorecard = new Scorecard();
    private gameplayAPI: GameplayAPI = new GameplayAPI();
    private scorecardAPI: ScorecardAPI = new ScorecardAPI();
    private gameConstant: GameConstant = new GameConstant();
    private computationEngine: ComputationEngine = new ComputationEngine();
    private gameplayEngine: GameplayEngine = new GameplayEngine();

    startGame(): void {
        let allPlayers: Array<ScorecardPlayer> = this.gameplayAPI.generateTeam(
            this.gameConstant.teamSize * this.gameConstant.numberOfTeams);
        this.cpuScorecard = this.scorecardAPI.initCPUScorecard(allPlayers.splice(0, this.gameConstant.teamSize));
        this.playerScorecard = this.scorecardAPI.initPlayerScorecard(allPlayers, this.cpuScorecard);

        this.resetGameResultsArea();
        this.displayPreGameMessage(this.cpuScorecard);
        this.updateStatsHeader(this.playerScorecard, this.cpuScorecard);
    }

    flipPage(): void {
        if(this.gameplayAPI.isGameOver(this.playerScorecard, this.cpuScorecard)) {
            this.gameOverShenanigans(this.playerScorecard, this.cpuScorecard);
            return;
        }

        let runScored: RunScored = this.gameplayAPI.getRunScored();
        this.updateGamePlayArea(runScored, this.playerScorecard);

        this.cpuScorecard = this.scorecardAPI.updateCPUScorecard(this.cpuScorecard, runScored.actual, this.playerScorecard);
        this.playerScorecard = this.scorecardAPI.updatePlayerScorecard(this.playerScorecard, this.cpuScorecard, runScored.actual);
        
        this.updateStatsHeader(this.playerScorecard, this.cpuScorecard);
        this.updateScorecardFooter(this.playerScorecard, this.cpuScorecard);

        if(this.gameplayAPI.isGameOver(this.playerScorecard, this.cpuScorecard)) {
            this.gameOverShenanigans(this.playerScorecard, this.cpuScorecard);
            return;
        }
    }

    gameOverShenanigans(playerScorecard: Scorecard, cpuScorecard: Scorecard): void {
        if(this.gameplayAPI.didPlayerWin(playerScorecard, cpuScorecard)){
            jQuery("#gameResultsArea #graWinner").show();
            jQuery("#gameResultsArea #graLoser").hide();
        } else {
            jQuery("#gameResultsArea #graWinner").hide();
            jQuery("#gameResultsArea #graLoser").show();
        }
        jQuery("#gamePlayArea #flipPageBtn").hide();
    }    

    // UI updates using JQuery
    // -----------------------

    displayPreGameMessage(cpuScorecard: Scorecard): void {
        let targetRuns: number = this.computationEngine.targetRuns(cpuScorecard.runs);
        let totalOvers: number = this.computationEngine.ballsToOvers(this.gameConstant.totalBalls);

        jQuery("#preGameMessage #t").html(targetRuns.toString());
        jQuery("#preGameMessage #o").html(totalOvers.toString());
    }

    updateStatsHeader(playerScorecard: Scorecard, cpuScorecard: Scorecard): void {
        let currentOver: number = this.gameplayEngine.getCurrentOver(playerScorecard.overs);
        let currentBatsman = playerScorecard.wickets === this.gameConstant.teamSize ? playerScorecard.wickets-1 : playerScorecard.wickets; // TODO: Move this to test and add comments
        let batsman: ScorecardPlayer = playerScorecard.players[currentBatsman];
        let bowler: ScorecardPlayer = cpuScorecard.players[currentOver];

        jQuery("#statsHeader #statsPlayerRuns").html(playerScorecard.runs.toString());
        jQuery("#statsHeader #statsPlayerWickets").html(playerScorecard.wickets.toString());
        jQuery("#statsHeader #statsCPURuns").html(cpuScorecard.runs.toString());

        jQuery("#statsHeader #statsOvers").html(playerScorecard.overs.toString());
        for(let b=0; b<6; b++){
            jQuery(`#statsHeader #statsBall${(b+1)}`).html(playerScorecard.overHistory[b].toString());
        }
        jQuery("#statsHeader #statsCurrentRunRate").html(playerScorecard.currentRunRate.toString());
        jQuery("#statsHeader #statsRequiredRunRate").html(playerScorecard.requiredRunRate.toString());
        jQuery("#statsHeader #statsProjectedScore").html(playerScorecard.projectedScore.toString());
        
        jQuery("#statsHeader #statsBatsman").html(batsman.name);
        jQuery("#statsHeader #statsBatsmanStyle").html(batsman.battingStyle);
        jQuery("#statsHeader #statsBatsmanStarPlayer").html(batsman.starBatsman ? "*": "");
        jQuery("#statsHeader #statsBowler").html(bowler.name);
        jQuery("#statsHeader #statsBowlerStyle").html(bowler.bowlingStyle);
        jQuery("#statsHeader #statsBowlerStarPlayer").html(bowler.starBowler ? "*": "");
    }

    updateGamePlayArea(runScored: RunScored, playerScorecard: Scorecard): void {
        let isDuckOut = playerScorecard.players[playerScorecard.wickets].runs === 0 
                            && runScored.actual === 0;

        jQuery("#gamePlayArea #gpaPageFlipped").html("page" + runScored.display);
        jQuery("#gamePlayArea .gpaRunScored").html(runScored.actual.toString());        

        if(isDuckOut) {
            jQuery("#gamePlayArea .gpaRunScored.gpaRunScoredExtra").html("Duck out");        
        }
    }

    updateScorecardFooter(playerScorecard: Scorecard, cpuScorecard: Scorecard): void {
        this.updatePlayerScorecard(playerScorecard);
        this.updateCPUScorecard(cpuScorecard);
    }

    updatePlayerScorecard(playerScorecard: Scorecard): void {
        let scorecardPlayerContent: string = "";
        let linebreak: string = "<br/>";

        scorecardPlayerContent += `YOU ${linebreak}`;
        scorecardPlayerContent += `Player --- Runs --- Balls --- S/R ${linebreak}`;
        for(let i: number = 0; i < playerScorecard.players.length; i++){
            let player = playerScorecard.players[i];
            let wicketTakenBy = player.wicketTakenBy != "" ? ` (b) ${player.wicketTakenBy}`: "";
            scorecardPlayerContent += `${player.name}${wicketTakenBy} --- ${player.runs} --- ${player.balls} --- ${player.strikeRate} ${linebreak}`;
        }
        scorecardPlayerContent += `TOTAL: ${playerScorecard.runs}/${playerScorecard.wickets} --- OVERS: ${playerScorecard.overs} ${linebreak}`;

        jQuery("#scorecardFooter #scorecardPlayer").html(scorecardPlayerContent);
    }

    updateCPUScorecard(cpuScorecard: Scorecard): void {
        let scorecardCPUContent: string = "";
        let linebreak: string = "<br/>";

        scorecardCPUContent += `CPU ${linebreak}`;
        scorecardCPUContent += `Player --- Runs --- Balls --- Wickets --- Eco. ${linebreak}`;
        for(let i: number = 0; i < cpuScorecard.players.length; i++){
            let player = cpuScorecard.players[i];
            scorecardCPUContent += `${player.name} --- ${player.runsGiven} --- ${player.balls} --- ${player.wickets} --- ${player.economy} ${linebreak}`;
        }
        scorecardCPUContent += `TOTAL: ${cpuScorecard.runs} --- OVERS: ${cpuScorecard.overs} ${linebreak}`;

        jQuery("#scorecardFooter #scorecardCPU").html(scorecardCPUContent);
    }

    // Initialize

    resetGameResultsArea(): void {
        jQuery("#gameResultsArea #graWinner").hide();
        jQuery("#gameResultsArea #graLoser").hide();
    }
}