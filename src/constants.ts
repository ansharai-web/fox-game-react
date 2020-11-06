export const ICONS = ["fish", "poop", "weather"];
export const SCENES = ["day", "rain"];
export const TICK_RATE = 3000;
export const RAIN_CHANCE = 0.2;
export const DAY_LENGTH = 60;
export const NIGHT_LENGTH = 2;
export const getNextHungerTime = (clock: number) =>
    Math.floor(Math.random() * 3) + 2 + clock;
export const getNextDieTime = (clock: number) =>
    Math.floor(Math.random() * 3) + 3 + clock;
export const getNextPoopTime = (clock: number) =>
    Math.floor(Math.random() * 3) + 8 + clock;
