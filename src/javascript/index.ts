import * as $ from "jquery";
import { GameplayAPI } from "./api/gameplay.api";
import { Player, ScorecardPlayer, Scorecard, RunScored } from "./model/game.model";
import { GameConstant } from "./constant/game.constant";
import { ScorecardAPI } from "./api/scorecard.api";
import { DisplayAPI } from "./api/display.api";

console.log("Book cricket console");

// Required variables
let userScorecard: Scorecard = new Scorecard();
let cpuScorecard: Scorecard = new Scorecard();
let gameplayAPI: GameplayAPI = new GameplayAPI();
let displayAPI: DisplayAPI = new DisplayAPI();
let scorecardAPI: ScorecardAPI = new ScorecardAPI();
let gameConstant: GameConstant = new GameConstant();

$(document).ready(function():void {
    displayAPI.startGame();

    $("#flipPageBtn").click(function():void {
        displayAPI.flipPage();
    });

    $("#playAgainBtn").click(function():void {
        displayAPI.startGame();
    });

    $("#resetBtn").click(function():void {
        console.log("resetBtn");
        let allPlayers: Array<ScorecardPlayer> = gameplayAPI.generateTeam(gameConstant.teamSize * gameConstant.numberOfTeams);
        cpuScorecard = scorecardAPI.initCPUScorecard(allPlayers.splice(0, gameConstant.teamSize));
        userScorecard = scorecardAPI.initPlayerScorecard(allPlayers, cpuScorecard);
    });

    $("#flipBtn").click(function():void {
        console.log("flipBtn");
        if(gameplayAPI.isGameOver(userScorecard, cpuScorecard)) {
            gameOverShenanigans();
            return;
        }

        let runScored: RunScored = gameplayAPI.getRunScored();
        console.log(">>>>>>>>>>>>", runScored, "<<<<<<<<<<<<<<");
        cpuScorecard = scorecardAPI.updateCPUScorecard(cpuScorecard, runScored.actual, userScorecard);
        userScorecard = scorecardAPI.updatePlayerScorecard(userScorecard, cpuScorecard, runScored.actual);

        if(gameplayAPI.isGameOver(userScorecard, cpuScorecard)) {
            gameOverShenanigans();
            return;
        }
    });

    $("#printScorecardBtn").click(function():void {
        printScorecard();
    });

    function printScorecard(): void {
        console.log("**********SCORECARD*********");
        console.log("PLAYER");
        console.log(userScorecard);
        console.log("CPU");
        console.log(cpuScorecard);
        console.log("****************************");
    }

    function gameOverShenanigans(): void {
        let gameResultsMessage: string = gameplayAPI.didPlayerWin(userScorecard, cpuScorecard) ?
            "CONGRATULATIONS!!! You won": "Sorry, try again";
        console.log(gameResultsMessage);
        printScorecard();
    }
});