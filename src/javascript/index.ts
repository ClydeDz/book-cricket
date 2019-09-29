import * as $ from "jquery";
import { DisplayAPI } from "./api/display.api";

console.log("Book cricket console");
let displayAPI: DisplayAPI = new DisplayAPI();

$(document).ready(function():void {
    displayAPI.startGame();    
    var interval = self.setInterval(function(){ displayAPI.infiniteRoll("div.stats-slider>div") },3000);

    $("#flipPageBtn").click(function():void {
        displayAPI.flipPage();
    });

    $("#playAgainBtn").click(function():void {
        displayAPI.startGame();
    });
});