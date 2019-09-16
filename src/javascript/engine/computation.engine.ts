export class ComputationEngine {

    ballsToOvers(balls: number): number {
        return Math.trunc(balls/6) + ((balls % 6) / 10);
    }

    runRate(runs: number, overs: number): number {
        return runs/overs;
    }

    targetRuns(runs: number): number {
        return runs + 1;
    }

    runsToWin(runsMade: number, targetRuns: number): number {
        return targetRuns - runsMade;
    }

    getProjectedScore(runsMade: number, oversPlayed: number, currentRunRate: number, totalOvers: number): number {
        return (currentRunRate * (totalOvers - oversPlayed)) + runsMade;
    }

    getRequiredRunRate(runsMade: number, oversPlayed: number, targetRuns: number, totalOvers: number): number{
        return this.runRate((targetRuns - runsMade), (totalOvers - oversPlayed));
    }

    getBattingStrikeRate(runsMade: number, ballsPlayed: number): number {
        let strikeRate: number = runsMade * 100 / ballsPlayed;
        return Math.round(strikeRate * 100) / 100;
    }

    getBowlingEconomy(ballsBowled: number, runsGiven: number):number {
        return runsGiven / (ballsBowled/6);
    }
}