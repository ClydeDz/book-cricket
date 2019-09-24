import * as $ from "jquery";
import { GameplayAPI } from "./api/gameplay.api";
import { Player, ScorecardPlayer, Scorecard } from "./model/game.model";
import { GameConstant } from "./constant/game.constant";
console.log("Book cricket console");

// required variables
let targetScore = 0;
let userTeam: Array<Player> = [];
let cpuTeam: Array<Player> = [];
let userScorecard: Scorecard = new Scorecard();
let cpuScorecard: Scorecard = new Scorecard();

// api init's
let gameplayAPI: GameplayAPI = new GameplayAPI();
let gameConstant: GameConstant = new GameConstant();

$(document).ready(function():void {
    // sample
    console.log(gameplayAPI.generateTeam(gameConstant.teamSize));

    $("#getTargetBtn").click(function():void {
       console.log("getTargetBtn");
       targetScore = gameplayAPI.getTargetScore();
    });
    $("#resetBtn").click(function():void {
        console.log("resetBtn");
        let allPlayers: Array<ScorecardPlayer> = gameplayAPI.generateTeam(gameConstant.teamSize * gameConstant.numberOfTeams);
        cpuScorecard = gameplayAPI.initCPUScorecard(allPlayers.splice(0, gameConstant.teamSize));
        userScorecard = gameplayAPI.initPlayerScorecard(allPlayers, cpuScorecard);
    });
    $("#flipBtn").click(function():void {
        console.log("flipBtn");
    });
    $("#printScorecardBtn").click(function():void {
        console.log("printScorecardBtn");
        console.log(userScorecard);
        console.log(cpuScorecard);
    });
});