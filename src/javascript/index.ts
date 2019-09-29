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
    var interval = self.setInterval(function(){ displayAPI.infiniteRoll("div.stats-slider>div") },3000);

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
});