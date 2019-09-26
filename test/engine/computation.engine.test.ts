import { ComputationEngine } from "../../src/javascript/engine/computation.engine";

describe("ballsToOvers", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: ComputationEngine = new ComputationEngine();
        let overs: number = computationEngine.ballsToOvers(267);
        expect(overs).toEqual(44.3);
    });
});

describe("targetRuns", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: ComputationEngine = new ComputationEngine();
        let overs: number = computationEngine.targetRuns(153);
        expect(overs).toEqual(154);
    });
});

describe("runsToWin", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: ComputationEngine = new ComputationEngine();
        let overs: number = computationEngine.runsToWin(125, 150);
        expect(overs).toEqual(25);
    });
});

describe("runRate", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: ComputationEngine = new ComputationEngine();
        let overs: number = computationEngine.runRate(20, 4);
        expect(overs).toEqual(5);
    });
});

describe("projectedScore", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: ComputationEngine = new ComputationEngine();
        let overs: number = computationEngine.projectedScore(160, 31.4, 5.095541401, 50);
        expect(overs).toEqual(252.7388534982);
    });
});

describe("requiredRunRate", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: ComputationEngine = new ComputationEngine();
        let overs: number = computationEngine.requiredRunRate(24, 0.5, 29, 1);
        expect(overs).toEqual(30);
        overs = computationEngine.requiredRunRate(12,0.3,27,1);
        expect(overs).toEqual(30);
        overs = computationEngine.requiredRunRate(160, 31.4, 301, 50);
        expect(overs).toEqual(7.69);
    });
});

describe("battingStrikeRate", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: ComputationEngine = new ComputationEngine();
        let overs: number = computationEngine.battingStrikeRate(96, 80);
        expect(overs).toEqual(120);
    });
});

describe("bowlingEconomy", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: ComputationEngine = new ComputationEngine();
        let overs: number = computationEngine.bowlingEconomy(6, 21);
        expect(overs).toEqual(21);
    });
});

describe("oversToBalls", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: ComputationEngine = new ComputationEngine();
        let overs: number = computationEngine.oversToBalls(31.4);
        expect(overs).toEqual(190);
    });
});