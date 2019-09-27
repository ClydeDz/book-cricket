import * as $ from "jquery";
import { GameplayAPI } from "./api/gameplay.api";
import { Player, ScorecardPlayer, Scorecard, RunScored } from "./model/game.model";
import { GameConstant } from "./constant/game.constant";

console.log("Book cricket console");

// Required variables
let userScorecard: Scorecard = new Scorecard();
let cpuScorecard: Scorecard = new Scorecard();

// API's
let gameplayAPI: GameplayAPI = new GameplayAPI();
let gameConstant: GameConstant = new GameConstant();

$(document).ready(function():void {
    $("#getTargetBtn").click(function():void {
       console.log("getTargetBtn");
    });

    $("#resetBtn").click(function():void {
        console.log("resetBtn");
        let allPlayers: Array<ScorecardPlayer> = gameplayAPI.generateTeam(gameConstant.teamSize * gameConstant.numberOfTeams);
        cpuScorecard = gameplayAPI.initCPUScorecard(allPlayers.splice(0, gameConstant.teamSize));
        userScorecard = gameplayAPI.initPlayerScorecard(allPlayers, cpuScorecard);
    });

    $("#flipBtn").click(function():void {
        console.log("flipBtn");
        if(gameplayAPI.isGameOver(userScorecard.balls)) {
            gameOverShenanigans();
            return;
        }

        let runScored: RunScored = gameplayAPI.getRunScored();
        console.log(">>>>>>>>>>>>", runScored, "<<<<<<<<<<<<<<");
        cpuScorecard = gameplayAPI.updateCPUScorecard(cpuScorecard, runScored.actual, userScorecard);
        userScorecard = gameplayAPI.updatePlayerScorecard(userScorecard, cpuScorecard, runScored.actual);

        if(gameplayAPI.isGameOver(userScorecard.balls)) {
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