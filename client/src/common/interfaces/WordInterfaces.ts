export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export const wordEmpty = {
  id: '',
  group: NaN,
  page: NaN,
  word: '',
  image: '',
  audio: '',
  audioMeaning: '',
  audioExample: '',
  textMeaning: '',
  textExample: '',
  transcription: '',
  wordTranslate: '',
  textMeaningTranslate: '',
  textExampleTranslate: '',
};

export interface IUserWord {
  difficulty: string;
  optional: {
    correctCount: number;
    errorCount: number;
  };
}

export const clearUserWord = {
  difficulty: '',
  optional: {
    correctCount: 0,
    errorCount: 0,
  },
};

export interface IExtWord extends IWord {
  _id: string;
  userWord: IUserWord;
}
