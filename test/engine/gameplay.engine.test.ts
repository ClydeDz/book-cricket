import { GameplayEngine } from "../../src/javascript/engine/gameplay.engine";

describe("getCurrentOver", function ():void {
    test("should return expected results", function ():void {
        let gameplayEngine: GameplayEngine = new GameplayEngine();
        let over: number = gameplayEngine.getCurrentOver(26.7);
        expect(over).toEqual(26);
        over = gameplayEngine.getCurrentOver(0.2);
        expect(over).toEqual(0);
        over = gameplayEngine.getCurrentOver(2.3);
        expect(over).toEqual(2);
    });
});

describe("getBookPageNumber", function ():void {
    test("should return expected results", function ():void {
        let gameplayEngine: GameplayEngine = new GameplayEngine();
        let pageNumber: number = gameplayEngine.getBookPageNumber(0, 10);
        expect(pageNumber).toBeGreaterThan(0);
        expect(pageNumber).toBeLessThan(10);

        pageNumber = gameplayEngine.getBookPageNumber(1, 99);
        expect(pageNumber).toBeGreaterThan(1);
        expect(pageNumber).toBeLessThan(99);
    });
});

describe("getTargetScore", function ():void {
    test("should return expected results", function ():void {
        let gameplayEngine: GameplayEngine = new GameplayEngine();
        let possibleRuns: number[] = [0, 2, 4, 6, 8];
        let targetScore: number = gameplayEngine.getTargetScore(possibleRuns, 30);
        expect(targetScore).toBeGreaterThanOrEqual(120);
        expect(targetScore).toBeLessThanOrEqual(180);

        possibleRuns = [5, 10];
        targetScore = gameplayEngine.getTargetScore(possibleRuns, 10);
        expect(targetScore).toBeGreaterThanOrEqual(50);
        expect(targetScore).toBeLessThanOrEqual(125);
    });
});