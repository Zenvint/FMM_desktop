import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
import Close from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 15,
  pt: 2,
  px: 4,
  pb: 3,
};


function ChildModal({tiile, btnName, classOption}) {
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
      <Button onClick={handleOpen} sx={{color: colors.grey[100], borderRadius: '10px', fontWeight: 'bold',  alignItems: 'center', marginTop: '20px',  ":hover": { color: colors.greenAccent[500], backgroundColor: colors.blueAccent[800] } }}>{btnName}</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{ ...style, width: 250, backgroundColor: colors.primary[400] }}>
          <h2 id="child-modal-title" style={{textAlign: 'center'}}>{tiile}</h2>
          <div>
            {classOption}
            <label>Name</label>
            <input type="text" placeholder='Enter the name' />
          </div>
          <Button onClick={handleClose} sx={{ color: colors.grey[100], borderRadius: '10px', fontWeight: 'bold', margin: '15px 0', ":hover": { backgroundColor: colors.blueAccent[800], color: colors.greenAccent[500] }, width: '75px',  left: '125px', marginTop: '25px' }} >Save</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function ModalList({btnName, icon}) {
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
    <div>
      <Button onClick={handleOpen} sx={{ color: colors.grey[100], ":hover": { color: colors.greenAccent[400] },  }}>{icon} {btnName}</Button>
      <Modal
        open={open}
      >
        <Box sx={{ ...style, width: 250, height: 300, backgroundColor: colors.primary[400], borderRadius: '10px',  }}>
            <h2 style={{textAlign: 'center'}} >Add New Item </h2>
            <button onClick={handleClose}style={{position: 'absolute', top: '10px', right: '10px', backgroundColor: colors.primary[400], border: 'none', borderRadius: '5px', cursor: 'pointer', color: colors.grey[100]}}><Close/></button>       
            <div style={{marginTop: '15px',width: '100%', display: 'flex', flexDirection: 'column', justifyItems: 'center'}}>
              <ChildModal  btnName={"School"} tiile={"New School"} />
              <ChildModal  btnName={"Section"} tiile={"New Section"} />
              <ChildModal  btnName={"Class"} tiile={"New Class"} />
            </div>  
        </Box>
      </Modal>
    </div>
  );
}
