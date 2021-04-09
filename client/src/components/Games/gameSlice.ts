import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import {
  IExtWord,
  IUserWord,
  IWord,
} from '../../common/interfaces/WordInterfaces';
import { getLocalUserId } from '../../common/helpers/userHelper';
import {
  createUserWord,
  updateUserWord,
} from '../../api/services/wordsService';
import { addStatisticsGame } from '../StatisticsPage/statisticsSlice';

export interface IGameData {
  group: number;
  page: number | null;
  difficulty: string;
}

export interface IScore {
  episode: number;
  series: number;
  score: number;
  experience: number;
}

interface GameState {
  isLoading: boolean;
  isBegin: boolean;
  isStart: boolean;
  isStop: boolean;
  route: string;
  level: number | null;
  data: IGameData;
  score: IScore;
  wordsTrue: IWord[];
  wordsFalse: IWord[];
  seriesTrueAnswers: {
    value: number;
    temp: number;
  };
  timeStart: Date | null;
}

const initialState: GameState = {
  isLoading: false,
  isBegin: false,
  isStart: false,
  isStop: false,
  route: '',
  level: null,
  data: {
    group: 0,
    page: null,
    difficulty: '',
  },
  score: {
    episode: 0,
    series: 0,
    score: 0,
    experience: 0,
  },
  wordsTrue: [],
  wordsFalse: [],
  seriesTrueAnswers: {
    value: 0,
    temp: 0,
  },
  timeStart: null,
};

export const seriesValues = [10, 20, 40, 80];

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsBegin: (state, action: PayloadAction<boolean>) => {
      state.isBegin = action.payload;
    },
    setIsStart: (state, action: PayloadAction<boolean>) => {
      state.isStart = action.payload;
    },
    setIsStop: (state, action: PayloadAction<boolean>) => {
      state.isStop = action.payload;
    },
    setRouteGame: (state, action: PayloadAction<string>) => {
      state.route = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
    setData: (state, action: PayloadAction<IGameData>) => {
      state.data = action.payload;
    },
    setScore: (state, action: PayloadAction<IScore>) => {
      state.score = action.payload;
    },
    addWordsTrue: (state, action: PayloadAction<IWord>) => {
      state.wordsTrue.push(action.payload);
    },
    addWordsFalse: (state, action: PayloadAction<IWord>) => {
      state.wordsFalse.push(action.payload);
    },
    setSeriesTrueAnswers: (
      state,
      action: PayloadAction<{
        value: number;
        temp: number;
      }>,
    ) => {
      state.seriesTrueAnswers = action.payload;
    },
    setTimeStart: (state, action: PayloadAction<Date>) => {
      state.timeStart = action.payload;
    },
    clearGame: (state) => {
      return initialState;
    },
    reset: (state) => {
      return {
        ...state,
        score: { ...initialState.score },
        wordsTrue: [],
        wordsFalse: [],
        seriesTrueAnswers: {
          value: 0,
          temp: 0,
        },
        timeStart: null,
      };
    },
  },
});

export const {
  setIsLoading,
  setIsBegin,
  setIsStart,
  setIsStop,
  setRouteGame,
  setLevel,
  setData,
  setScore,
  addWordsTrue,
  addWordsFalse,
  setSeriesTrueAnswers,
  setTimeStart,
  clearGame,
  reset,
} = gameSlice.actions;

export const initGame = (): AppThunk => async (dispatch, getState) => {
  const route = getState().game.route;
  if (route) {
    console.log('route');
    if (route === '/textbook') {
      dispatch(
        setData({
          group: getState().textbook.activeGroup,
          page: getState().textbook.activePage,
          difficulty: '',
        }),
      );
      dispatch(setIsBegin(true));
    }
    if (route === '/dictionary') {
      dispatch(
        setData({
          group: getState().textbook.activeGroup,
          page: getState().dictionary.dictionaryPage,
          difficulty: getState().dictionary.dictionaryDifficulty,
        }),
      );
      dispatch(setIsBegin(true));
    }
  } else if (getState().game.level !== null) {
    dispatch(
      setData({
        group: getState().game.level as number,
        page: null,
        difficulty: '',
      }),
    );
    dispatch(setIsBegin(true));
  }
};

export const setLevelGame = (level: number): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setLevel(level));
  dispatch(initGame());
};

export const startGame = (): AppThunk => async (dispatch, getState) => {
  dispatch(setIsStart(true));
  dispatch(setTimeStart(new Date()));
};

export const addAnswerGame = ({
  word,
  result,
}: {
  word: IWord;
  result: boolean;
}): AppThunk => async (dispatch, getState) => {
  let { episode, series, score, experience } = getState().game.score;
  const { value, temp } = getState().game.seriesTrueAnswers;
  if (result) {
    score = score + seriesValues[series];
    if (episode < 3) episode++;
    if (episode === 3 && series < 2) {
      episode = 0;
      series++;
    }
    if (episode === 3 && series < 3) {
      series++;
    }
    experience++;

    dispatch(setSeriesTrueAnswers({ value, temp: temp + 1 }));
  } else {
    episode = 0;
    series = 0;

    dispatch(
      setSeriesTrueAnswers({
        value: value > temp ? value : temp,
        temp: 0,
      }),
    );
  }
  dispatch(setScore({ episode, series, score, experience }));

  if (getState().game.level === null) {
    const extWord = word as IExtWord;
    const { difficulty, optional } = extWord.userWord;
    const { correctCount, errorCount } = optional;
    const create = difficulty === '';
    const userWord = {
      ...extWord.userWord,
      difficulty: difficulty === '' ? 'work' : difficulty,
      optional: {
        ...optional,
        correctCount: result ? correctCount + 1 : correctCount,
        errorCount: !result ? errorCount + 1 : errorCount,
      },
    };
    const newWord = { ...extWord, userWord };
    result ? dispatch(addWordsTrue(newWord)) : dispatch(addWordsFalse(newWord));

    dispatch(fetchSetUserWord({ wordId: newWord.id, userWord, create }));
  } else {
    result ? dispatch(addWordsTrue(word)) : dispatch(addWordsFalse(word));
  }
};

export const fetchSetUserWord = ({
  wordId,
  userWord,
  create = false,
}: {
  wordId: string;
  userWord: IUserWord;
  create?: boolean;
}): AppThunk => async (dispatch, getState) => {
  const userId = getLocalUserId();
  if (userId) {
    const param = {
      userId,
      wordId,
      userWord,
    };
    const newUserWordResponse = create
      ? await createUserWord(param)
      : await updateUserWord(param);
    if (newUserWordResponse.error) {
      console.log('Невожможно сохранить слово');
      return;
    }
  }
};

export const fetchWordSetDifficulty = ({
  word,
  difficulty,
}: {
  word: IWord;
  difficulty: string;
}): AppThunk => async (dispatch, getState) => {
  const extWord = word as IExtWord;
  const userWord: IUserWord = { ...extWord.userWord, difficulty };
  dispatch(fetchSetUserWord({ wordId: extWord.id, userWord }));
};

export const stopGame = (name: string): AppThunk => async (
  dispatch,
  getState,
) => {
  dispatch(setIsStart(false));
  dispatch(setIsStop(true));
  if (getState().game.level === null) {
    const statistics = {
      name,
      timeStart: getState().game.timeStart as Date,
      timeStop: new Date(),
      wordsTrueIds: getState().game.wordsTrue.map((word) => word.id),
      wordsFalseIds: getState().game.wordsFalse.map((word) => word.id),
      seriesTrueAnswers: getState().game.seriesTrueAnswers.value,
      score: getState().game.score.score,
      experience: getState().game.score.experience,
    };
    dispatch(addStatisticsGame(statistics));
  }
};

export const resetGame = (): AppThunk => async (dispatch, getState) => {
  dispatch(reset());
  dispatch(setIsStop(false));
};

export const isLoadingGame = (state: RootState) => state.game.isLoading;
export const isBeginGame = (state: RootState) => state.game.isBegin;
export const isStartGame = (state: RootState) => state.game.isStart;
export const isStopGame = (state: RootState) => state.game.isStop;
export const routeGame = (state: RootState) => state.game.route;
export const levelGame = (state: RootState) => state.game.level;
export const gameData = (state: RootState) => state.game.data;
export const scoreGame = (state: RootState) => state.game.score;
export const wordsTrueGame = (state: RootState) => state.game.wordsTrue;
export const wordsFalseGame = (state: RootState) => state.game.wordsFalse;
export const resultGame = (state: RootState) => ({
  score: state.game.score.score,
  experience: state.game.score.experience,
  wordsTrue: state.game.wordsTrue,
  wordsFalse: state.game.wordsFalse,
});

export default gameSlice.reducer;
