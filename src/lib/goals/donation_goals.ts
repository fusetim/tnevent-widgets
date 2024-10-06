export interface DonationGoal {
    title: string;
    goal: bigint;
};

export interface DonationGoalRotator {
    goals: DonationGoal[];
    value: bigint;
    shownGoals?: number;
    goalAchieved?: (goal: DonationGoal) => void;
};
