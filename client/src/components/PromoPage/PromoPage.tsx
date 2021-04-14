import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ReactPageScroller from 'react-page-scroller';
import PromoSectionTitle from './PromoSectionTitle';
import PromoSectionTextbook from './PromoSectionTextbook';
import PromoSectionGame from './PromoSectionGame';
import PromoSectionStatistics from './PromoSectionStatistics';
import PromoSectionRegister from './PromoSectionRegister';
import { userStore } from '../LoginPage/userSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
    },
  }),
);

export default function PromoPage() {
  const classes = useStyles();
  const user = useSelector(userStore);
  const history = useHistory();

  const [section, setSection] = useState<number>(0);

  // useEffect(() => {
  //   history.push('/');
  // }, [user]);

  const handleBeforePageScroll = (number: number) => {};

  const handleChange = (number: number) => {
    setSection(number);
  };

  const handleNextSection = () => {
    setSection(section + 1);
  };

  const handleSclollTop = () => {
    setSection(0);
  };

  return (
    <>
      <ReactPageScroller
        customPageNumber={section}
        onBeforePageScroll={handleBeforePageScroll}
        pageOnChange={handleChange}
      >
        <PromoSectionTitle
          show={section === 0}
          onNextPage={handleNextSection}
        />
        <PromoSectionTextbook
          show={section === 1}
          onNextPage={handleNextSection}
        />
        <PromoSectionGame show={section === 2} onNextPage={handleNextSection} />
        <PromoSectionStatistics
          show={section === 3}
          onNextPage={handleNextSection}
        />
        <PromoSectionRegister
          show={section === 4}
          onSclollTop={handleSclollTop}
        />
      </ReactPageScroller>
    </>
  );
}
