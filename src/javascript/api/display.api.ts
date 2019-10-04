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

        this.toggleScorecard();
        this.resetGameResultsArea();
        this.resetGamePlayArea();
        this.displayPreGameMessage(this.cpuScorecard);
        this.updateStatsHeader(this.playerScorecard, this.cpuScorecard);
        this.updateScorecardFooter(this.playerScorecard, this.cpuScorecard);
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

    infiniteRoll(rollonElements: string): void {
        $(rollonElements).each(function() {
            let thisElement = $(this);
            if(thisElement.hasClass("active")) {
                let nextElement = thisElement.next().length > 0 ? thisElement.next() : $(rollonElements).first();
                thisElement.removeClass("active");                
                nextElement.addClass("active");
                return false;
            }
        });
    }

    toggleScorecard(): void {
        jQuery("#scorecardFooter").toggle();
    }

    gameOverShenanigans(playerScorecard: Scorecard, cpuScorecard: Scorecard): void {
        if(this.gameplayAPI.didPlayerWin(playerScorecard, cpuScorecard)){
            jQuery("#gameResultsArea #graWinner").show();
            jQuery("#gameResultsArea #graLoser").hide();
        } else {
            jQuery("#gameResultsArea #graWinner").hide();
            jQuery("#gameResultsArea #graLoser").show();
        }
        jQuery("#gameResultsArea #playAgainBtn").show();
        jQuery("#gamePlayArea #flipPageBtn").hide();
    }    

    // UI updates using JQuery
    // -----------------------

    displayPreGameMessage(cpuScorecard: Scorecard): void {
        let totalOvers: number = this.computationEngine.ballsToOvers(this.gameConstant.totalBalls);

        jQuery("#preGameMessage #t").html(cpuScorecard.targetRuns.toString());
        jQuery("#preGameMessage #o").html(totalOvers.toString());
    }

    updateStatsHeader(playerScorecard: Scorecard, cpuScorecard: Scorecard): void {
        let currentOver: number = this.gameplayEngine.getCurrentOver(playerScorecard.overs);
        let currentBatsman = playerScorecard.wickets === this.gameConstant.teamSize ? playerScorecard.wickets-1 : playerScorecard.wickets; // TODO: Move this to test and add comments
        let batsman: ScorecardPlayer = playerScorecard.players[currentBatsman];
        let bowler: ScorecardPlayer = cpuScorecard.players[currentOver];
        let ballsRemaining = this.gameConstant.totalBalls - playerScorecard.balls;
        let runsRemaining = this.computationEngine.runsToWin(playerScorecard.runs, cpuScorecard.targetRuns);

        jQuery("#statsHeader #statsPlayerRuns").html(playerScorecard.runs.toString());
        jQuery("#statsHeader #statsPlayerWickets").html(playerScorecard.wickets.toString());
        jQuery("#statsHeader #statsTargetRuns").html(cpuScorecard.targetRuns.toString());

        jQuery("#statsHeader #statsOvers").html(playerScorecard.overs.toString());
        for(let b=0; b<6; b++){
            jQuery(`#statsHeader #statsBall${(b+1)}`).html(playerScorecard.overHistory[b]);
        }
        jQuery("#statsHeader #statsCurrentRunRate").html(playerScorecard.currentRunRate.toString());
        jQuery("#statsHeader #statsRequiredRunRate").html(playerScorecard.requiredRunRate.toString());
        jQuery("#statsHeader #statsProjectedScore").html(playerScorecard.projectedScore.toString());
        jQuery("#statsHeader #statsRunsRemaining").html(runsRemaining + "");
        jQuery("#statsHeader #statsBallsRemaining").html(`${ballsRemaining} ${ballsRemaining === 1 ? "ball": "balls" }`);
        
        jQuery("#statsHeader #statsBatsman").html(batsman.name);
        jQuery("#statsHeader #statsBatsmanStyle").html(batsman.battingStyle);
        jQuery("#statsHeader #statsBatsmanStarPlayer").html(batsman.starBatsman ? "*": "");
        jQuery("#statsHeader #statsBatsmanRunsMade").html(batsman.runs.toString());
        jQuery("#statsHeader #statsBatsmanBallsPlayed").html(`(${batsman.balls})`);
        jQuery("#statsHeader #statsBowler").html(bowler.name);
        jQuery("#statsHeader #statsBowlerStyle").html(bowler.bowlingStyle);
        jQuery("#statsHeader #statsBowlerStarPlayer").html(bowler.starBowler ? "*": "");
        jQuery("#statsHeader #statsBowlerRunsGiven").html(bowler.runsGiven.toString());
        jQuery("#statsHeader #statsBowlerBallsBowled").html(`(${bowler.ballsBowled})`);
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
        this.updateCPUScorecard(cpuScorecard, playerScorecard.overs);
    }

    updatePlayerScorecard(playerScorecard: Scorecard): void {
        let scorecardPlayerContent: string = "<div class='scorecard-table'>";
        let currentBatsman = playerScorecard.wickets === this.gameConstant.teamSize ? 
                                    playerScorecard.wickets-1 : playerScorecard.wickets; // TODO: Move this to test and add comments
        
        scorecardPlayerContent += `<div class='scorecard-table-title'><span>
            <span class='pull-left'>Scorecard</span>
            <span class='pull-right'>You</span>`;
        scorecardPlayerContent += `</span></div>`;
        scorecardPlayerContent += `<div class='scorecard-table-header'>`;
        scorecardPlayerContent += `<span>
            <div class='scorecard-table-column-1'>Player</div>
            <div class='scorecard-table-column-2'>Runs</div>
            <div class='scorecard-table-column-3'>Balls</div>
            <div class='scorecard-table-column-4'>S/R</div>`;
        scorecardPlayerContent += `</span></div>`;

        scorecardPlayerContent += `<div class='scorecard-table-body'>`;
        for(let i: number = 0; i < playerScorecard.players.length; i++){
            let player = playerScorecard.players[i];
            let isOnStrike = i === currentBatsman ? "*" : "";
            let wicketTakenBy = player.wicketTakenBy != "" ? ` (b) ${player.wicketTakenBy}`: "";

            scorecardPlayerContent += `
                <div class='scorecard-table-column-1'>${player.name}${isOnStrike}${wicketTakenBy}</div>
                <div class='scorecard-table-column-2'>${player.runs}</div>
                <div class='scorecard-table-column-3'>${player.balls}</div>
                <div class='scorecard-table-column-4'>${player.strikeRate}</div>`;
        }
        scorecardPlayerContent += `</div>`;

        scorecardPlayerContent += `<div class='scorecard-table-footer'><span>
            <span class='pull-left'>TOTAL: ${playerScorecard.runs}/${playerScorecard.wickets}</span>
            <span class='pull-right'>OVERS: ${playerScorecard.overs}</span>
            </span></div>`;

        scorecardPlayerContent += "</div>"
        jQuery("#scorecardFooter #scorecardPlayer").html(scorecardPlayerContent);
    }

    updateCPUScorecard(cpuScorecard: Scorecard, oversBowled: number): void {
        let scorecardCPUContent: string = "<div class='scorecard-table scorecard-table-extra-column'>";
        let currentOver: number = this.gameplayEngine.getCurrentOver(oversBowled);

        scorecardCPUContent += `<div class='scorecard-table-title'><span>
            <span class='pull-left'>Scorecard</span>
            <span class='pull-right'>CPU</span>`;
        scorecardCPUContent += `</span></div>`;
        scorecardCPUContent += `<div class='scorecard-table-header'>`;
        scorecardCPUContent += `<span>
            <div class='scorecard-table-column-1'>Player</div>
            <div class='scorecard-table-column-2'>Runs given</div>
            <div class='scorecard-table-column-3'>Balls</div>
            <div class='scorecard-table-column-4'>Wickets</div>
            <div class='scorecard-table-column-5'>Eco</div>`;
            scorecardCPUContent += `</span></div>`;

        scorecardCPUContent += `<div class='scorecard-table-body'>`;

        for(let i: number = 0; i < cpuScorecard.players.length; i++){
            let player = cpuScorecard.players[i];
            let isCurrentlyBowling = i === currentOver ? "*" : "";

            scorecardCPUContent += `
                <div class='scorecard-table-column-1'>${player.name}${isCurrentlyBowling}</div>
                <div class='scorecard-table-column-2'>${player.runsGiven}</div>
                <div class='scorecard-table-column-3'>${player.ballsBowled}</div>
                <div class='scorecard-table-column-4'>${player.wickets}</div>
                <div class='scorecard-table-column-5'>${player.economy}</div>`;
        }
        scorecardCPUContent += `</div>`;

        scorecardCPUContent += `<div class='scorecard-table-footer'><span>
            <span class='pull-left'>TOTAL: ${cpuScorecard.runs}</span>
            <span class='pull-right'>OVERS: ${cpuScorecard.overs}</span>
            </span></div>`;

        scorecardCPUContent += "</div>";
        jQuery("#scorecardFooter #scorecardCPU").html(scorecardCPUContent);
    }

    // Initialize

    resetGameResultsArea(): void {
        jQuery("#gameResultsArea #graWinner").hide();
        jQuery("#gameResultsArea #graLoser").hide();
        jQuery("#gameResultsArea #playAgainBtn").hide();
    }

    resetGamePlayArea(): void {
        jQuery("#gamePlayArea #gpaPageFlipped").html("0");
        jQuery("#gamePlayArea .gpaRunScored").html("");        
        jQuery("#gamePlayArea #flipPageBtn").show();
    }
}