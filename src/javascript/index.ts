import * as $ from "jquery";
import { DisplayAPI } from "./api/display.api";
import { GameConstant } from "./constant/game.constant";

let displayAPI: DisplayAPI = new DisplayAPI();
let gameConstant: GameConstant = new GameConstant();

$(document).ready(function():void {
    displayAPI.startGame();    
    var interval = self.setInterval(function() { 
        displayAPI.infiniteRoll("div.stats-slider>div"); 
    }, gameConstant.statsRotationTimer);

    $("#flipPageBtn").click(function():void {
        displayAPI.flipPage();
    });

    $("#playAgainBtn").click(function():void {
        displayAPI.startGame();
    });

    $("#scorecardBtn").click(function():void {
        displayAPI.toggleScorecard();
    });

    $("#togglePlayerCPUScorecardBtn").click(function():void {
        displayAPI.togglePlayerCPUScorecard();
    });
});