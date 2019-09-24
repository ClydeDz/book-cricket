export class Player {
    name: string;
    starBatsman: boolean;
    starBowler: boolean;
    battingStyle: string;
    bowlingStyle: string;
    country: string;
    age: number;
    battingEconomy: number;
    bowlingEconomy: number;
    id: number;

    constructor (
        id: number,
        name: string,
        country: string,
        age: number,
        battingStyle: string,
        bowlingStyle: string,
        battingEconomy: number,
        bowlingEconomy: number,
        starBatsman: boolean,
        starBowler: boolean
        ) {
            this.name = name;
            this.starBatsman = starBatsman;
            this.starBowler = starBowler;
            this.battingStyle = battingStyle;
            this.bowlingStyle = bowlingStyle;
            this.country = country;
            this.age = age;
            this.battingEconomy = battingEconomy;
            this.bowlingEconomy = bowlingEconomy;
            this.id = id;
        }
}

export class ScorecardPlayer extends Player {
    runs: number = 0;
    balls: number = 0;
    overs: number = 0;
    strikeRate: number = 0;
    ballsBowled: number = 0;
    runsGiven: number = 0;
    wickets: number = 0;
    economy: number = 0;
}
export class Scorecard {
    players: Array<ScorecardPlayer> = [];
    runs: number = 0;
    balls: number = 0;
    wickets: number = 0;
    overs: number = 0;
    currentRunRate: number = 0;
    projectedScore: number = 0;
    requiredRunRate: number = 0;
}