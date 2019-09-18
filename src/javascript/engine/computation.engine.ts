export class ComputationEngine {

    ballsToOvers(balls: number): number {
        return Math.trunc(balls/6) + ((balls % 6) / 10);
    }

    oversToBalls(overs: number): number {
        return Math.trunc(overs) * 6 + ((overs % 1) * 10);
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
        let ballsRemaining: number = this.oversToBalls(totalOvers) - this.oversToBalls(oversPlayed);
        let oversRemaining = this.ballsToOvers(ballsRemaining);
        return (currentRunRate * oversRemaining) + runsMade;
    }

    getRequiredRunRate(runsMade: number, oversPlayed: number, targetRuns: number, totalOvers: number): number{
        let runsRemaining: number = targetRuns - runsMade;
        let ballsRemaining: number = this.oversToBalls(totalOvers) - this.oversToBalls(oversPlayed);
        let requiredRR: number = (runsRemaining / ballsRemaining) * 6;
        return Math.round(requiredRR * 100) / 100;
    }

    getBattingStrikeRate(runsMade: number, ballsPlayed: number): number {
        let strikeRate: number = runsMade * 100 / ballsPlayed;
        return Math.round(strikeRate * 100) / 100;
    }

    getBowlingEconomy(ballsBowled: number, runsGiven: number):number {
        return runsGiven / (ballsBowled/6);
    }
}