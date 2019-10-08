import * as jQuery from "jquery";
import { GameplayAPI } from "./gameplay.api";
import { Player, ScorecardPlayer, Scorecard, RunScored, GamePanel } from "../model/game.model";
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

        this.initializePlayerCPUScorecard();
        this.initializeScorecard();
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
        let gameplayEngine = this.gameplayEngine;
        $(rollonElements).each(function() {
            let thisElement = $(this);
            if(thisElement.hasClass("active")) {
                if(thisElement.hasClass("ad-roll")) {
                    let imageIdentifier = gameplayEngine.getRandomNumberWithinRange(1,4);
                    thisElement.children().first().attr("src", `./src/images/assets/ads/ad-${imageIdentifier}.jpg`);
                }
                let nextElement = thisElement.next().length > 0 ? thisElement.next() : $(rollonElements).first();
                thisElement.removeClass("active");                
                nextElement.addClass("active");
                return false;
            }
        });
    }
    
    initializeScorecard(): void {
        jQuery(".scorecard-footer-component").hide();
    }

    toggleScorecard(): void {
        jQuery(".scorecard-footer-component").toggle();
        jQuery("#scorecardFooter").addClass("zoomIn animated");
    }

    initializePlayerCPUScorecard(): void {
        jQuery("#scorecardFooter #scorecardPlayer").show();
        jQuery("#scorecardFooter #scorecardCPU").hide();
    }

    togglePlayerCPUScorecard(): void {
        let isViewCPUScorecardBtn = jQuery("#scorecardFooter #togglePlayerCPUScorecardBtn").hasClass("view-cpu-scorecard");
        let viewPlayerCPUScorecardBtnText = isViewCPUScorecardBtn ? "View Player Scorecard" : "View CPU Scorecard";
        
        jQuery("#scorecardFooter #togglePlayerCPUScorecardBtn span").html(viewPlayerCPUScorecardBtnText);
        jQuery("#scorecardFooter #togglePlayerCPUScorecardBtn").toggleClass("view-cpu-scorecard");
        jQuery("#scorecardFooter #togglePlayerCPUScorecardBtn").toggleClass("view-player-scorecard");
        jQuery("#scorecardFooter #scorecardPlayer").toggle();
        jQuery("#scorecardFooter #scorecardCPU").toggle();        
    }

    gameOverShenanigans(playerScorecard: Scorecard, cpuScorecard: Scorecard): void {
        let gamePanelData = new GamePanel();

        if(this.gameplayAPI.didPlayerWin(playerScorecard, cpuScorecard)){
            let wonByWickets = this.gameConstant.teamSize - playerScorecard.wickets;
            this.updateCentralScreensContent("You won", "Congratulations!", "You won by", `${wonByWickets} wickets`);
            gamePanelData.isResultsMode = true;
            gamePanelData.isWinner = true;
        } else {
            let lostByRuns = cpuScorecard.targetRuns - playerScorecard.runs;
            this.updateCentralScreensContent("You lost", "Sorry, try again!", "You lost by", `${lostByRuns} runs`);
            gamePanelData.isResultsMode = true;
            gamePanelData.isWinner = false;
        }
        let thisClassInstance = this;
        setTimeout(function(){
            thisClassInstance.updateGamePanels(gamePanelData);
        }, this.gameConstant.gameResultsTimer);
        jQuery("#gameResultsArea #playAgainBtn").show();
        jQuery("#gamePlayArea #flipPageBtn").hide();
    } 
    
    updateGamePanels(gamePanelData: GamePanel): void {
        let gamePanelDataWithoutDuckOut = Object.assign({}, gamePanelData);
        gamePanelDataWithoutDuckOut.isDuckOut = false; // So that we don't get duck out image twice
        let scorePanelImage = this.gameplayAPI.getScorePanelImage(gamePanelDataWithoutDuckOut);
        let extraScorePanelImage = gamePanelData.isDuckOut ? this.gameplayAPI.getScorePanelImage(gamePanelData): scorePanelImage;

        jQuery("#gamePlayArea .gpaRunScored").html(`<img src="./src/images/assets/panels/${scorePanelImage}.gif" />`);
        if(gamePanelData.isDuckOut) {
            jQuery("#gamePlayArea .gpaRunScored.gpaRunScoredExtra").html(`<img src="./src/images/assets/panels/${extraScorePanelImage}.gif" />`);        
        }
    }

    // UI updates using JQuery
    // -----------------------

    displayPreGameMessage(cpuScorecard: Scorecard): void {
        let totalOvers: number = this.computationEngine.ballsToOvers(this.gameConstant.totalBalls);
        let runsDisplayText = cpuScorecard.targetRuns === 1 ? "run" : "runs";
        let overDisplayText = totalOvers === 1 ? "over" : "overs";
        this.updateCentralScreensContent(`You need to make`,
            `${cpuScorecard.targetRuns} ${runsDisplayText} in ${totalOvers} ${overDisplayText}`,
            `Ready?`,
            `Let's play!`);
    }

    updateStatsHeader(playerScorecard: Scorecard, cpuScorecard: Scorecard): void {
        let totalOvers = this.computationEngine.ballsToOvers(this.gameConstant.totalBalls);
        let currentOver: number = this.gameplayEngine.getCurrentOver(playerScorecard.overs);
        let currentBatsman = playerScorecard.wickets === this.gameConstant.teamSize ? playerScorecard.wickets-1 : playerScorecard.wickets; // TODO: Move this to test and add comments
        let currentBowler = currentOver === totalOvers ? currentOver - 1 : currentOver;
        let batsman: ScorecardPlayer = playerScorecard.players[currentBatsman];
        let bowler: ScorecardPlayer = cpuScorecard.players[currentBowler];
        let ballsRemaining = this.gameConstant.totalBalls - playerScorecard.balls;
        let runsRemaining = this.computationEngine.runsToWin(playerScorecard.runs, cpuScorecard.targetRuns);

        jQuery("#statsHeader #statsPlayerRuns").html(playerScorecard.runs.toString());
        jQuery("#statsHeader #statsPlayerWickets").html(playerScorecard.wickets.toString());
        jQuery("#statsHeader #statsTargetRuns").html(cpuScorecard.targetRuns.toString());

        jQuery("#statsHeader #statsOvers").html(playerScorecard.overs.toString());
        for(let b=0; b<6; b++){
            jQuery(`#statsHeader #statsBall${(b+1)}`)
                .html(`<span class='flash animated'>${playerScorecard.overHistory[b]}</span>`);
        }
        jQuery("#statsHeader #statsCurrentRunRate").html(playerScorecard.currentRunRate.toString());
        jQuery("#statsHeader #statsRequiredRunRate").html(playerScorecard.requiredRunRate.toString());
        jQuery("#statsHeader #statsProjectedScore").html(playerScorecard.projectedScore.toString());
        jQuery("#statsHeader #statsRunsRemaining").html(runsRemaining + "");
        jQuery("#statsHeader #statsBallsRemaining").html(`${ballsRemaining} ${ballsRemaining === 1 ? "ball": "balls" }`);
        
        jQuery("#statsHeader #statsBatsman").html(batsman.name);
        jQuery("#statsHeader #statsBatsmanStyle").html(batsman.battingStyle);
        jQuery("#statsHeader #statsBatsmanIsStarPlayer").html(batsman.starBatsman ? `<img src="./src/images/icons/star.png"/>`: ``);
        jQuery("#statsHeader #statsBatsmanRunsMade").html(`<span class='flash animated'>${batsman.runs}</span>`);
        jQuery("#statsHeader #statsBatsmanBallsPlayed").html(`(${batsman.balls})`);
        jQuery("#statsHeader #statsBowler").html(bowler.name);
        jQuery("#statsHeader #statsBowlerStyle").html(bowler.bowlingStyle);
        jQuery("#statsHeader #statsBowlerIsStarPlayer").html(bowler.starBowler ? `<img src="./src/images/icons/star.png"/>`: ``);
        jQuery("#statsHeader #statsBowlerRunsGiven").html(`<span class='flash animated'>${bowler.runsGiven}</span>`);
        jQuery("#statsHeader #statsBowlerBallsBowled").html(`(${bowler.ballsBowled})`);
    }

    updateGamePlayArea(runScored: RunScored, playerScorecard: Scorecard): void {
        let player = playerScorecard.players[playerScorecard.wickets];
        let gamePanelData = new GamePanel();
        gamePanelData.runScored = runScored.actual;
        gamePanelData.isDuckOut = player.runs === 0 && runScored.actual === 0;
        gamePanelData.isOut = runScored.actual === 0;
        gamePanelData.isCentury = !(player.runs > 100) && (player.runs + runScored.actual >= 100) && (player.runs - runScored.actual < 100);
        gamePanelData.isHalfCentury = !(player.runs > 50) && (player.runs + runScored.actual >= 50) && (player.runs - runScored.actual < 50);

        let centralScreensSet2Content = this.updateGamePlayAreaHelper(gamePanelData);
        this.updateCentralScreensContent("You flipped", "Page " + runScored.display, centralScreensSet2Content[0], centralScreensSet2Content[1]);
        this.updateGamePanels(gamePanelData);
    }

    updateGamePlayAreaHelper(gamePanel: GamePanel): string[] {
        if(gamePanel.isDuckOut) {
            return ["Quack quack!", "Duck out"];
        }
        if(gamePanel.isCentury) {
            return ["Well deserved mate", "What a fine century!"];
        }
        if(gamePanel.isHalfCentury) {
            return ["Fabulous", "A knockout 50"];
        }
        if(gamePanel.isOut) {
            return ["Well played but you're...", "Out"];
        }
        return [null, null];
    }

    updateCentralScreensContent(firstLineSet1: string, secondLineSet1: string, firstLineSet2: string, secondLineSet2: string): void {
        let set1ContentHTML = `<div class='central-screens-slider'>
            <div class='flipInX animated active'>
                <div>${firstLineSet1}</div>
                <div>${secondLineSet1}</div>
            </div>`;
        let set2ContentHTML = !firstLineSet2 && !secondLineSet2 ? `` : 
            `<div class='flipInX animated'>
                <div>${firstLineSet2}</div>
                <div>${secondLineSet2}</div>
            </div>`;
        let htmlContent = set1ContentHTML + set2ContentHTML + "</div>";
        jQuery("#gamePlayArea .central-screens .central-screens-content").html(htmlContent);
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
            let isOnStrike = i === currentBatsman ? `<i>*</i>` : ``;
            let wicketTakenBy = player.wicketTakenBy != "" ? ` (b) ${player.wicketTakenBy}`: "";
            let starPlayer = player.starBatsman ? `<span class='star-player'><img src='./src/images/icons/star.png' /></span>`
                : `<span class='star-player'>&nbsp;</span>`;

            scorecardPlayerContent += `
                <div class='scorecard-table-column-1'>${starPlayer}${player.name}${isOnStrike}${wicketTakenBy}</div>
                <div class='scorecard-table-column-2'>${player.runs}</div>
                <div class='scorecard-table-column-3'>${player.balls}</div>
                <div class='scorecard-table-column-4'>${player.strikeRate}</div>`;
        }
        scorecardPlayerContent += `</div>`;

        scorecardPlayerContent += `<div class='scorecard-table-footer'><span>
            <span class='pull-left'>Total ${playerScorecard.runs}/${playerScorecard.wickets}</span>
            <span class='pull-right'>Overs ${playerScorecard.overs}</span>
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
            let isCurrentlyBowling = i === currentOver ? `<i>*</i>` : ``;
            let starPlayer = player.starBatsman ? `<span class='star-player'><img src='./src/images/icons/star.png' /></span>`
                : `<span class='star-player'>&nbsp;</span>`;

            scorecardCPUContent += `
                <div class='scorecard-table-column-1'>${starPlayer}${player.name}${isCurrentlyBowling}</div>
                <div class='scorecard-table-column-2'>${player.runsGiven}</div>
                <div class='scorecard-table-column-3'>${player.ballsBowled}</div>
                <div class='scorecard-table-column-4'>${player.wickets}</div>
                <div class='scorecard-table-column-5'>${player.economy}</div>`;
        }
        scorecardCPUContent += `</div>`;

        scorecardCPUContent += `<div class='scorecard-table-footer'><span>
            <span class='pull-left'>Total ${cpuScorecard.runs}</span>
            <span class='pull-right'>Overs ${cpuScorecard.overs}</span>
            </span></div>`;

        scorecardCPUContent += "</div>";
        jQuery("#scorecardFooter #scorecardCPU").html(scorecardCPUContent);
    }

    // Initialize

    resetGameResultsArea(): void {
        this.updateCentralScreensContent("Ready?", "Let's play!", null, null);
        jQuery("#gameResultsArea #playAgainBtn").hide();
    }

    resetGamePlayArea(): void {
        jQuery("#gamePlayArea #gpaPageFlipped").html("0");
        jQuery("#gamePlayArea .gpaRunScored").html(`<img src="./src/images/assets/panels/countdown.gif" />`);           
        jQuery("#gamePlayArea #flipPageBtn").show();
    }
}