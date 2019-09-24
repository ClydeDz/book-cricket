import { Player, ScorecardPlayer } from "../model/game.model";

export class GameplayEngine {
    getRandom(playersArray:Array<ScorecardPlayer>, n: number): any {
        let shuffled: Array<ScorecardPlayer> = playersArray.sort(function(): any {return .5 - Math.random(); });
        let selected: Array<ScorecardPlayer> = shuffled.slice(0,n);
        return selected;
    }
}