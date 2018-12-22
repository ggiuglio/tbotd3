export const D20Math = {
  rollD20: () =>  Math.floor(Math.random() * (20 - 1 + 1)) + 1,
  calculateStatsBonus: (stat) => Math.floor((stat - 10) / 2)  
}