import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import SettingsSavannah from './SettingsSavannah';
import SettingsSprint from './SettingsSprint';
import SettingsAudioChallenge from './SettingsAudioChallenge';
import SettingsDesigner from './SettingsDesigner';
import PageLayout from '../PageLayout/PageLayout';
import SettingsTextbook from './SettingsTextbook';
import {
  ISettings,
  settingsTextbook,
  settingsAudioChallenge,
  settingsDesigner,
  settingsSavannah,
  settingsSprint,
  saveSettings,
} from './settingsSlice';
import routesData from '../Routes/routesData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3, 0),
    },
    background: {
      backgroundImage: `url(${routesData.settings.background})`,
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
  const designer = useSelector(settingsDesigner);

  const handleChangeSettings = (nameSettings: string, settings: ISettings) => {
    dispatch(saveSettings({ nameSettings, settings }));
  };

  return (
    <PageLayout background={classes.background}>
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
            onChange={handleChangeSettings}
          />

          <Typography className={classes.header} variant='h5' component='h2'>
            Настройки игр
          </Typography>
          <Grid container spacing={10}>
            <Grid item container xs={12} sm={6}>
              <SettingsSavannah
                settings={savannah}
                onChange={handleChangeSettings}
              />
            </Grid>
            <Grid item container xs={12} sm={6}>
              <SettingsAudioChallenge
                settings={audioChallenge}
                onChange={handleChangeSettings}
              />
            </Grid>
            <Grid item container xs={12} sm={6}>
              <SettingsSprint
                settings={sprint}
                onChange={handleChangeSettings}
              />
            </Grid>
            <Grid item container xs={12} sm={6}>
              <SettingsDesigner
                settings={designer}
                onChange={handleChangeSettings}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </PageLayout>
  );
}
