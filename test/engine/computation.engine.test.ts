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

describe("runs to win 2", function ():void {
    test("should return expected results", function ():void {
        let  computationEngine: any = new ComputationEngine();
        let overs: number = computationEngine.runsToWin(125, 150);
        expect(overs).toEqual(25);
    });
});