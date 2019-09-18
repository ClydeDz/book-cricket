import { ComputationEngine } from "../../src/javascript/engine/computation.engine";

describe("balls to overs", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.ballsToOvers(267);
        expect(overs).toEqual(44.3);
    });
});

describe("target runs", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.targetRuns(153);
        expect(overs).toEqual(154);
    });
});

describe("runs to win", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.runsToWin(125, 150);
        expect(overs).toEqual(25);
    });
});

describe("runs rate", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.runRate(20, 4);
        expect(overs).toEqual(5);
    });
});

describe("getProjectedScore", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.getProjectedScore(160, 31.4, 5.095541401, 50);
        expect(overs).toEqual(252.7388534982);
    });
});

describe("getRequiredRunRate", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.getRequiredRunRate(160, 31.4, 301, 50);
        expect(overs).toEqual(7.69);
    });
});

describe("getBattingStrikeRate", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.getBattingStrikeRate(96, 80);
        expect(overs).toEqual(120);
    });
});

describe("getBowlingEconomy", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.getBowlingEconomy(6, 21);
        expect(overs).toEqual(21);
    });
});

describe("oversToBalls", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.oversToBalls(31.4);
        expect(overs).toEqual(190);
    });
});