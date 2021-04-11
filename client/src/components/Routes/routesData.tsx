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
import homeImg from '../../assets/home.jpg';
import homeBg from '../../assets/home.jpg';
import textbookImg from '../../assets/textbook.jpg';
import textbookBg from '../../assets/textbook.jpg';
import dictionaryImg from '../../assets/dictionary.jpg';
import dictionaryBg from '../../assets/dictionary.jpg';
import gamesImg from '../../assets/savannah.jpg';
import gamesBg from '../../assets/savannah.jpg';
import savannahImg from '../../assets/savannah.jpg';
import savannahBg from '../../assets/savannah.jpg';
import audioChallengeImg from '../../assets/audiochallenge.jpg';
import audioChallengeBg from '../../assets/audiochallenge.jpg';
import sprintImg from '../../assets/sprint.jpg';
import sprintBg from '../../assets/sprint.jpg';
import designerImg from '../../assets/designer.jpg';
import designerBg from '../../assets/designer.jpg';
import statisticsImg from '../../assets/statistics.jpg';
import statisticsBg from '../../assets/statistics.jpg';
import settingsImg from '../../assets/settings.jpg';
import settingsBg from '../../assets/settings.jpg';
import aboutImg from '../../assets/about.jpg';
import aboutBg from '../../assets/about.jpg';
import promoImg from '../../assets/promo.jpg';
import promoBg from '../../assets/promo.jpg';

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
  [propName: string]: IRouteInfo;
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
    description: '',
    image: textbookImg,
    background: textbookBg,
    icon: <LocalLibraryIcon />,
    route: '/textbook',
  },
  dictionary: {
    title: 'Словарь',
    description: '',
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
    description: '',
    image: savannahImg,
    background: savannahBg,
    icon: <EcoIcon />,
    route: '/savannah',
  },
  audioChallenge: {
    title: 'Аудиовызов',
    description: '',
    image: audioChallengeImg,
    background: audioChallengeBg,
    icon: <HeadsetIcon />,
    route: '/audioChallenge',
  },
  sprint: {
    title: 'Спринт',
    description: '',
    image: sprintImg,
    background: sprintBg,
    icon: <DirectionsRunIcon />,
    route: '/sprint',
  },
  designer: {
    title: 'Конструктор',
    description: '',
    image: designerImg,
    background: designerBg,
    icon: <ViewModuleIcon />,
    route: '/designer',
  },
  statistics: {
    title: 'Статистика',
    description: '',
    image: statisticsImg,
    background: statisticsBg,
    icon: <EqualizerIcon />,
    route: '/statistics',
  },
  settings: {
    title: 'Настройки',
    description: '',
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
};
