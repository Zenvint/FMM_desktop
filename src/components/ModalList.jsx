import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import DeleteIcon from '@mui/icons-material/Delete';
import Close from '@mui/icons-material/Close';

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
      <Button onClick={handleOpen} sx={{color: colors.grey[100], borderRadius: '10px', fontWeight: 'bold',  alignItems: 'center', marginTop: '20px',  ":hover": { color: colors.greenAccent[500], backgroundColor: colors.blueAccent[800] } }}>+ ADD</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 250, backgroundColor: colors.primary[400] }}>
          <h2 id="child-modal-title" style={{textAlign: 'center'}}>Add new</h2>
          <div>
            <label>Name</label>
            <input type="text" placeholder='Enter the name' />
          </div>
          <Button onClick={handleClose} sx={{ color: colors.grey[100], borderRadius: '10px', fontWeight: 'bold', margin: '15px 0', ":hover": { backgroundColor: colors.blueAccent[800], color: colors.greenAccent[500] }, width: '75px',  left: '125px', marginTop: '25px' }} >Save</Button>
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
  <li key={itemDetails.id} style={{color: colors.grey[100], display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '3px 0', marginLeft: '25x', }} >
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
      >
        <Box sx={{ ...style, width: 350, height: 550, backgroundColor: colors.primary[400], borderRadius: '10px',  }}>
          <h2 style={{color: colors.grey[100], marginBottom: '20px', fontWeight: 'bold', fontSize: '21px', textAlign: 'center'}} id="parent-modal-title">{header}</h2>
            <button onClick={handleClose}style={{position: 'absolute', top: '38px', right: '30px', backgroundColor: colors.primary[400], border: 'none', borderRadius: '5px', cursor: 'pointer', color: colors.grey[100]}}><Close/></button>
            <div style={{height: '375px', overflow: 'auto', width: '95%', backgroundColor: colors.grey[800], borderRadius: '10px', marginTop: '20px',}}>
            <ul style={{listStyle: 'none', padding: 25, margin: 0, }}>{listen}</ul>
            </div>
          <ChildModal  />
        </Box>
      </Modal>
    </div>
  );
}
