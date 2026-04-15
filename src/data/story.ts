export const STORY = {
  coupleNames: {
    him: "Dai 💙",
    her: "Buddy 💛",
  },
  years: 10,
  anniversaryYear: 2,
  startYear: 2016,
  keyDates: {
    proposalDay: "November 7, 2016",
    acceptedDay: "November 17, 2016",
    engagement: "March 7, 2024",
    wedding: "April 22, 2024",
  },
  colors: {
    her: "#FFD166",
    him: "#6BA4D8",
  },
  nicknames: {
    callHer: "Buddy",
    sheCallsMe: "Dai",
  },
} as const;

export type Story = typeof STORY;
