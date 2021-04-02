import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PageLayout from '../PageLayout/PageLayout';
import ContainerMain from '../PageLayout/ContainerMain';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SettingsSavannah from './SettingsSavannah';
import SettingsSprint from './SettingsSprint';
import SettingsAudioChallenge from './SettingsAudioChallenge';
import SettingsFindCouple from './SettingsFindCouple';
import Container from '@material-ui/core/Container';
import {
  // ISettingsTextbook,
  // ISettingsSavannah,
  // ISettingsAudioChallenge,
  // ISettingsSprint,
  // ISettingsFindCouple,
  ISettings,
  settingsTextbook,
  settingsAudioChallenge,
  settingsFindCouple,
  settingsSavannah,
  settingsSprint,
  // setSettingsTextbook,
  // setSettingsSavannah,
  // setSettingsAudioChallenge,
  // setSettingsSprint,
  // setSettingsFindCouple,
  // setSettings,
  saveSettings,
} from './settingsSlice';
import SettingsTextbook from './SettingsTextbook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 0),
    },
    header: {
      marginBottom: theme.spacing(3),
    },
  }),
);

export default function SettingsPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const textbook = useSelector(settingsTextbook);
  const savannah = useSelector(settingsSavannah);
  const audioChallenge = useSelector(settingsAudioChallenge);
  const sprint = useSelector(settingsSprint);
  const findCouple = useSelector(settingsFindCouple);

  const handleChangeSettings = (nameSettings: string, settings: ISettings) => {
    console.log('nameSettings: ', nameSettings);
    dispatch(saveSettings({ nameSettings, settings }));
  };
  // const handleOnChangeSettingsTextbook = (settings: ISettingsTextbook) => {
  //   dispatch(setSettingsTextbook(settings));
  // };
  // const handleOnChangeSettingsSavannah = (settings: ISettingsSavannah) => {
  //   dispatch(setSettingsSavannah(settings));
  // };
  // const handleOnChangeSettingsAudioChallenge = (
  //   settings: ISettingsAudioChallenge,
  // ) => {
  //   dispatch(setSettingsAudioChallenge(settings));
  // };
  // const handleOnChangeSettingsSprint = (settings: ISettingsSprint) => {
  //   dispatch(setSettingsSprint(settings));
  // };
  // const handleOnChangeSettingsFindCouple = (settings: ISettingsFindCouple) => {
  //   dispatch(setSettingsFindCouple(settings));
  // };

  return (
    <PageLayout>
      <ContainerMain>
        <Paper className={classes.root}>
          <Container>
            <Typography className={classes.header} variant='h4' component='h1'>
              Настройки
            </Typography>
            <Typography className={classes.header} variant='h5' component='h1'>
              Настройки учебника
            </Typography>
            <SettingsTextbook
              settings={textbook}
              // onChange={handleChangeSettings('textbook')}
              onChange={handleChangeSettings}
            />

            <Typography className={classes.header} variant='h5' component='h2'>
              Настройки игр
            </Typography>
            <Grid container spacing={10}>
              <Grid item container xs={12} sm={6}>
                <SettingsSavannah
                  settings={savannah}
                  // onChange={handleOnChangeSettingsSavannah}
                  onChange={handleChangeSettings}
                />
              </Grid>
              <Grid item container xs={12} sm={6}>
                <SettingsAudioChallenge
                  settings={audioChallenge}
                  // onChange={handleOnChangeSettingsAudioChallenge}
                  onChange={handleChangeSettings}
                />
              </Grid>
              <Grid item container xs={12} sm={6}>
                <SettingsSprint
                  settings={sprint}
                  // onChange={handleOnChangeSettingsSprint}
                  onChange={handleChangeSettings}
                />
              </Grid>
              <Grid item container xs={12} sm={6}>
                <SettingsFindCouple
                  settings={findCouple}
                  // onChange={handleOnChangeSettingsFindCouple}
                  onChange={handleChangeSettings}
                />
              </Grid>
            </Grid>
          </Container>
        </Paper>
      </ContainerMain>
    </PageLayout>
  );
}
