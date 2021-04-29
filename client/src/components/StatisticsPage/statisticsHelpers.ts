import isSameDay from 'date-fns/isSameDay';
import addDays from 'date-fns/addDays';

import { IStatisticsGame } from './statisticsSlice';

export const countGames = (
  games: IStatisticsGame[],
  nameGame?: string,
): number => {
  const count = nameGame
    ? games.filter((game) => game.name === nameGame).length
    : games.length;
  return count;
};

export const seriesWords = (
  games: IStatisticsGame[],
  nameGame?: string,
): number => {
  let series = 0;
  for (let game of games) {
    if (
      game.seriesTrueAnswers > series &&
      (nameGame ? game.name === nameGame : true)
    )
      series = game.seriesTrueAnswers;
  }
  return series;
};

export const countWords = (
  games: IStatisticsGame[],
  nameGame?: string,
): number => {
  const countSet = new Set();
  for (let game of games) {
    if (nameGame ? game.name === nameGame : true) {
      game.wordsTrueIds
        .concat(game.wordsFalseIds)
        .forEach((id) => countSet.add(id));
    }
  }
  return countSet.size;
};

export const percentTrueWords = (
  games: IStatisticsGame[],
  nameGame?: string,
): number => {
  let wordsTrue = 0;
  let wordsFalse = 0;
  for (let game of games) {
    if (nameGame ? game.name === nameGame : true) {
      wordsTrue += game.wordsTrueIds.length;
      wordsFalse += game.wordsFalseIds.length;
    }
  }
  return Math.round((wordsTrue * 100) / (wordsTrue + wordsFalse)) || 0;
};

export interface IDataChartItem {
  date: number;
  countGames: number;
  countWords: number;
  percentTrueWords: number;
  totalWords: number;
}

export const getDataChart = (games: IStatisticsGame[]): IDataChartItem[] => {
  if (games.length === 0) return [];

  const data = [];
  let gamesTotal = [];
  let currentDay = new Date(
    games[0].timeStart.getFullYear(),
    games[0].timeStart.getMonth(),
    games[0].timeStart.getDate(),
  );
  const endDay = new Date(
    games[games.length - 1].timeStart.getFullYear(),
    games[games.length - 1].timeStart.getMonth(),
    games[games.length - 1].timeStart.getDate(),
  );

  while (currentDay <= endDay) {
    const gamesPerDay = games.filter((game) =>
      isSameDay(currentDay, game.timeStart),
    );
    gamesTotal.push(...gamesPerDay);
    data.push({
      date: currentDay.getTime(),
      countGames: countGames(gamesPerDay),
      countWords: countWords(gamesPerDay),
      percentTrueWords: percentTrueWords(gamesPerDay),
      totalWords: countWords(gamesTotal),
    });
    currentDay = addDays(currentDay, 1);
  }

  return data;
};
