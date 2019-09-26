import { GameplayEngine } from "../../src/javascript/engine/gameplay.engine";
import { ScorecardPlayer } from "../../src/javascript/model/game.model";

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

describe("getRandomPlayers", function ():void {
    test("should return expected results", function ():void {
        let gameplayEngine: GameplayEngine = new GameplayEngine();
        let players: Array<ScorecardPlayer> = [
            new ScorecardPlayer(253802,"Virat Kohli","India",31,"Right-hand bat","Right-arm medium",10843,6.22,true,false),
            new ScorecardPlayer(28081,"MS Dhoni","India",38,"Right-hand bat","Right-arm medium",10500,5.16,true,false),
            new ScorecardPlayer(36084,"Yuvraj Singh","India",38,"Left-hand bat","Slow left-arm orthodox",8701,5.1,true,false),
            new ScorecardPlayer(38699,"Ross Taylor","New Zealand",35,"Right-hand bat","Right-arm offbreak",8026,5,true,false),
            new ScorecardPlayer(219889,"David Warner","Australia",33,"Left-hand bat","Legbreak",4343,8,false,false)
        ];

        let team: Array<ScorecardPlayer> = gameplayEngine.getRandomPlayers(players, 2);
        expect(team.length).toEqual(2);
        expect(team[0].id !== team[1].id).toBeTruthy();
        expect(team[0].name !== team[1].name).toBeTruthy();
    });
});