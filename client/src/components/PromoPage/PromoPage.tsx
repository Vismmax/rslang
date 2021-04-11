import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ReactPageScroller from 'react-page-scroller';
import PageLayout from '../PageLayout/PageLayout';
import PromoSectionTitle from './PromoSectionTitle';
import PromoSectionTextbook from './PromoSectionTextbook';
import PromoSectionGame from './PromoSectionGame';
import PromoSectionStatistics from './PromoSectionStatistics';
import PromoSectionRegister from './PromoSectionRegister';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
      // backgroundImage: 'url("/img/bg.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
    },
    root1: {
      width: '100%',
      height: '100%',
      backgroundColor: 'green',
      // backgroundImage: 'url("/img/bg.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
    },
    root2: {
      width: '100%',
      height: '100%',
      backgroundColor: 'blue',
      // backgroundImage: 'url("/img/bg.jpg")',
      // backgroundSize: 'cover',
      // backgroundPosition: 'center',
    },
  }),
);

export default function PromoPage() {
  const classes = useStyles();

  const [section, setSection] = useState<number>(0);

  useEffect(() => {
    console.log('section: ', section);
  }, [section]);

  const handleBeforePageScroll = (number: number) => {
    // setSection(number);
  };

  const handleChange = (number: number) => {
    setSection(number);
  };

  const handleNextSection = () => {
    setSection(section + 1);
  };

  return (
    <>
      <ReactPageScroller
        customPageNumber={section}
        onBeforePageScroll={handleBeforePageScroll}
        pageOnChange={handleChange}
      >
        <PromoSectionTitle onNextPage={handleNextSection} />
        <PromoSectionTextbook onNextPage={handleNextSection} />
        <PromoSectionGame
          onNextPage={handleNextSection}
          show={section === 2 ? true : false}
        />
        <PromoSectionStatistics onNextPage={handleNextSection} />
        <PromoSectionRegister />
      </ReactPageScroller>
    </>
  );
}
