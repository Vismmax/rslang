import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AvatarEditor from 'react-avatar-editor';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import IconButton from '@material-ui/core/IconButton';

interface Props {
  open: boolean;
  image: string;
  onClose: () => void;
  onSave: (image: Blob) => void;
}

export default function EditorAvatar({ open, image, onClose, onSave }: Props) {
  const [editor, setEditor] = useState();
  const [scale, setScale] = useState(1.2);

  const handleSave = () => {
    //@ts-ignore
    const canvas = editor.getImageScaledToCanvas();
    canvas.toBlob((blob: Blob) => {
      onSave(blob);
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Редактор фото пользователя'}</DialogTitle>
      <DialogContent>
        <AvatarEditor
          ref={setEditor}
          image={image}
          width={200}
          height={200}
          border={50}
          color={[255, 255, 255, 0.8]}
          scale={scale}
          rotate={0}
        />
        <Grid container alignItems='center' spacing={2}>
          <Grid item>
            <IconButton onClick={() => setScale(scale - 0.1)}>
              <ZoomOutIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Slider
              value={scale}
              step={0.1}
              min={1}
              max={5}
              onChange={(e, val) => setScale(val as number)}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={() => setScale(scale + 0.1)}>
              <ZoomInIcon />
            </IconButton>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justify='space-between'>
          <Button onClick={handleClose} variant='contained'>
            Отмена
          </Button>
          <Button onClick={handleSave} variant='contained' color='primary'>
            Сохранить
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}
