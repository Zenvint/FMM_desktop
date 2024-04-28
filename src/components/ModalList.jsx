import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 15,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} sx={{color: colors.grey[100], borderRadius: '10px', fontWeight: 'bold', padding: '5px 25px', marginTop: '20px', marginLeft: '50px', ":hover": { color: colors.greenAccent[500], backgroundColor: colors.primary[400] } }}>+ ADD</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 200 }}>
          {/* <h2 id="child-modal-title">{formTitle}</h2>
          <div>
            <label>{inputName}</label>
            <input type="text" placeholder='Enter the name' />
          </div> */}
          <Button onClick={handleClose} sx={{ color: colors.grey[100], borderRadius: '10px', fontWeight: 'bold', margin: '0 10px', ":hover": { backgroundColor: colors.grey[800], color: colors.greenAccent[500] }, width: '75px'  }} >Save</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ModalList({btnName, items, header}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const listen = items.map(itemDetails =>
  <li key={itemDetails.id} style={{color: colors.grey[100], display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 0'}} >
    <p>{ itemDetails.Name} </p>
    <DeleteIcon style={{cursor: 'pointer'}} />
  </li>
  )


  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={{ color: colors.grey[100], margin: '0 10px', ":hover": { backgroundColor: colors.grey[800] }, width: '150px'  }}>{btnName}</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 250 }}>
            <h2 style={{color: colors.grey[100], marginBottom: '20px', fontWeight: 'bold', fontSize: '21px', textAlign: 'center'}} id="parent-modal-title">{header}</h2>
            <ul style={{listStyle: 'none', padding: 0, margin: 0, }}>{listen}</ul>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
