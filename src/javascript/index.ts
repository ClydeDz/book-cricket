import * as $ from "jquery";
import { DisplayAPI } from "./api/display.api";
import { GameConstant } from "./constant/game.constant";

let displayAPI: DisplayAPI = new DisplayAPI();
let gameConstant: GameConstant = new GameConstant();

$(document).ready(function():void {
    displayAPI.startGame();    
    var interval = self.setInterval(function() { 
        displayAPI.infiniteRoll("div.stats-slider>div"); 
    }, gameConstant.STATS_ROTATION_TIMER);
    
    var centralScreensTimerInterval = self.setInterval(function() { 
        displayAPI.infiniteRoll("div.central-screens-slider>div"); 
    }, gameConstant.CENTRAL_SCREEN_TIMER);

    $("#flipPageBtn").click(function():void {
        displayAPI.flipPage();
    });

    $("#playAgainBtn").click(function():void {
        displayAPI.startGame();
    });

    $("#scorecardBtn").click(function():void {
        displayAPI.toggleScorecard();jQuery("#scorecardFooter").addClass("zoomIn animated");
    });

    $("#closeScorecardBtn").click(function():void {
        $("#scorecardFooter").addClass("zoomOut animated");
        setTimeout(function() {
            displayAPI.toggleScorecard();
            $("#scorecardFooter").removeClass("zoomOut");
        }, 500);        
    });

    $("#togglePlayerCPUScorecardBtn").click(function():void {
        displayAPI.togglePlayerCPUScorecard();
    });
});