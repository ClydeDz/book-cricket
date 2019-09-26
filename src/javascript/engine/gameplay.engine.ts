import { Player, ScorecardPlayer } from "../model/game.model";

export class GameplayEngine {
    getRandomPlayers(playersArray:Array<ScorecardPlayer>, n: number): Array<ScorecardPlayer> {
        let shuffled: Array<ScorecardPlayer> = playersArray.sort(function(): any {return .5 - Math.random(); });
        let selected: Array<ScorecardPlayer> = shuffled.slice(0,n);
        return selected;
    }

    getCurrentOver(overs: number): number {
        return Math.trunc(overs);
    }

    getTargetScore(possibleRuns: number[], totalBalls: number): number {
        possibleRuns.splice(possibleRuns.indexOf(0), 1);
        let zeroRemovedPossibleRuns: number[] = possibleRuns;
        let min: number = Math.min.apply(Math, zeroRemovedPossibleRuns);
        let max: number = Math.max.apply(Math, zeroRemovedPossibleRuns);
        let averageRuns: number = (min*totalBalls + max*totalBalls)/2;
        let minAverageRuns: number = averageRuns - ( (min*totalBalls) / 2);
        let maxAverageRuns: number = averageRuns + (min*totalBalls);

        return this.getRandomNumberWithinRange(minAverageRuns, maxAverageRuns);
    }

    getBookPageNumber(bookStart: number, bookEnd: number): number {
        return this.getRandomNumberWithinRange(bookStart, bookEnd);
    }

    private getRandomNumberWithinRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}