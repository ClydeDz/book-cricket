import * as $ from "jquery";
import { SciFi } from "./SciFi";

let x: string = "book cricket";
console.log("ts hi", x);

$(document).ready(function():void {
    let sci: any = new SciFi();
    console.log("ready", sci.bazzleme());
});

export class Calculator {
    add(): number {
        return 5+2;
    }
}