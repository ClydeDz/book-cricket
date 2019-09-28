export class ComputationEngine {

    ballsToOvers(balls: number): number {
        return Math.trunc(balls/6) + ((balls % 6) / 10);
    }

    oversToBalls(overs: number): number {
        return Math.trunc(overs) * 6 + ((overs % 1) * 10);
    }

    runRate(runs: number, overs: number): number {
        let runRate = Math.round((runs/overs) * 100) / 100;
        return runRate < 0 || runRate === Infinity ? 0 : runRate;
    }

    targetRuns(runs: number): number {
        return runs + 1;
    }

    runsToWin(runsMade: number, targetRuns: number): number {
        let runsToWin: number = targetRuns - runsMade;
        return runsToWin < 0 ? 0 : runsToWin;
    }

    projectedScore(runsMade: number, oversPlayed: number, currentRunRate: number, totalOvers: number): number {
        let ballsRemaining: number = this.oversToBalls(totalOvers) - this.oversToBalls(oversPlayed);
        let oversRemaining: number = this.ballsToOvers(ballsRemaining);
        let projectedScore: number = (currentRunRate * oversRemaining) + runsMade;
        projectedScore = Math.round(projectedScore * 100) / 100;
        return projectedScore < 0 ? 0 : projectedScore;
    }

    requiredRunRate(runsMade: number, oversPlayed: number, targetRuns: number, totalOvers: number): number {
        let runsRemaining: number = targetRuns - runsMade;
        let ballsRemaining: number = this.oversToBalls(totalOvers) - this.oversToBalls(oversPlayed);
        let requiredRR: number = (runsRemaining / ballsRemaining) * 6;
        requiredRR = Math.round(requiredRR * 100) / 100;
        return requiredRR < 0 || requiredRR === Infinity ? 0 : requiredRR;
    }

    battingStrikeRate(runsMade: number, ballsPlayed: number): number {
        let strikeRate: number = runsMade * 100 / ballsPlayed;
        return Math.round(strikeRate * 100) / 100;
    }

    bowlingEconomy(ballsBowled: number, runsGiven: number):number {
        return runsGiven / (ballsBowled/6);
    }
}