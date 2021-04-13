import React from 'react';
import EcoIcon from '@material-ui/icons/Eco';
import HeadsetIcon from '@material-ui/icons/Headset';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import HomeIcon from '@material-ui/icons/Home';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import MovieIcon from '@material-ui/icons/Movie';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import homeImg from '../../assets/home-th.webp';
import homeBg from '../../assets/home.webp';
import textbookImg from '../../assets/textbook-th.webp';
import textbookBg from '../../assets/textbook.webp';
import dictionaryImg from '../../assets/dictionary-th.webp';
import dictionaryBg from '../../assets/dictionary.webp';
import gamesImg from '../../assets/sprint-th.webp';
import gamesBg from '../../assets/sprint.webp';
import savannahImg from '../../assets/savannah-th.webp';
import savannahBg from '../../assets/savannah.webp';
import audioChallengeImg from '../../assets/audiochallenge-th.webp';
import audioChallengeBg from '../../assets/audiochallenge.webp';
import sprintImg from '../../assets/sprint-th.webp';
import sprintBg from '../../assets/sprint.webp';
import designerImg from '../../assets/designer-th.webp';
import designerBg from '../../assets/designer.webp';
import statisticsImg from '../../assets/statistics-th.webp';
import statisticsBg from '../../assets/statistics.webp';
import settingsImg from '../../assets/settings-th.webp';
import settingsBg from '../../assets/settings.webp';
import aboutImg from '../../assets/about-th.webp';
import aboutBg from '../../assets/about.webp';
import promoImg from '../../assets/promo-th.webp';
import promoBg from '../../assets/promo.webp';
import loginImg from '../../assets/promo-th.webp';
import loginBg from '../../assets/promo.webp';
import userImg from '../../assets/promo-th.webp';
import userBg from '../../assets/promo.webp';

// export enum RoutesEnum {}

interface IRouteInfo {
  title: string;
  description: string;
  image: string;
  background: string;
  icon: JSX.Element;
  route: string;
}

interface IRoutesData {
  home: IRouteInfo;
  textbook: IRouteInfo;
  dictionary: IRouteInfo;
  games: IRouteInfo;
  savannah: IRouteInfo;
  audioChallenge: IRouteInfo;
  sprint: IRouteInfo;
  designer: IRouteInfo;
  statistics: IRouteInfo;
  settings: IRouteInfo;
  about: IRouteInfo;
  promo: IRouteInfo;
  login: IRouteInfo;
  user: IRouteInfo;
}

export const routesData: IRoutesData = {
  home: {
    title: 'Домой',
    description: '',
    image: homeImg,
    background: homeBg,
    icon: <HomeIcon />,
    route: '/',
  },
  textbook: {
    title: 'Учебник',
    description: 'Содержит псе доступные в приложении слова.',
    image: textbookImg,
    background: textbookBg,
    icon: <LocalLibraryIcon />,
    route: '/textbook',
  },
  dictionary: {
    title: 'Словарь',
    description: 'Содержит словы, которые использовал пользователь.',
    image: dictionaryImg,
    background: dictionaryBg,
    icon: <MenuBookIcon />,
    route: '/dictionary',
  },
  games: {
    title: 'Игры',
    description: '',
    image: gamesImg,
    background: gamesBg,
    icon: <SportsEsportsIcon />,
    route: '',
  },
  savannah: {
    title: 'Саванна',
    description:
      'Оттачивает понимание речи и быстрого перевода слов, помагает не забыть выученные слова.',
    image: savannahImg,
    background: savannahBg,
    icon: <EcoIcon />,
    route: '/savannah',
  },
  audioChallenge: {
    title: 'Аудиовызов',
    description: 'Улучшает восприятие речи на слух.',
    image: audioChallengeImg,
    background: audioChallengeBg,
    icon: <HeadsetIcon />,
    route: '/audioChallenge',
  },
  sprint: {
    title: 'Спринт',
    description: 'Учит быстро переводить на ваш родной язык.',
    image: sprintImg,
    background: sprintBg,
    icon: <DirectionsRunIcon />,
    route: '/sprint',
  },
  designer: {
    title: 'Конструктор',
    description: 'Формирует навыки обратного перевода и написания слов.',
    image: designerImg,
    background: designerBg,
    icon: <ViewModuleIcon />,
    route: '/designer',
  },
  statistics: {
    title: 'Статистика',
    description: 'Формирует статистику по всем занятиям.',
    image: statisticsImg,
    background: statisticsBg,
    icon: <EqualizerIcon />,
    route: '/statistics',
  },
  settings: {
    title: 'Настройки',
    description: 'Дает возможность настроить приложение под себя.',
    image: settingsImg,
    background: settingsBg,
    icon: <SettingsIcon />,
    route: '/settings',
  },
  about: {
    title: 'Команда',
    description: '',
    image: aboutImg,
    background: aboutBg,
    icon: <GroupIcon />,
    route: '/about',
  },
  promo: {
    title: 'Обзор',
    description: '',
    image: promoImg,
    background: promoBg,
    icon: <MovieIcon />,
    route: '/promo',
  },
  login: {
    title: 'Вход',
    description: '',
    image: loginImg,
    background: loginBg,
    icon: <ExitToAppIcon />,
    route: '/login',
  },
  user: {
    title: 'Пользователь',
    description: '',
    image: userImg,
    background: userBg,
    icon: <PersonIcon />,
    route: '/user',
  },
};

export default routesData;
