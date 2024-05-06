import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';


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
  
export default  function SessionForm({icon, title}) {
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
				<Button
					onClick={handleOpen}
					sx={{
						color: colors.grey[100],
						borderRadius: "10px",
						fontWeight: "bold",
						alignItems: "center",
						marginTop: "20px",
						":hover": { color: colors.greenAccent[500] }
					}}>
					{icon} {title}
				</Button>
				<Modal open={open} onClose={handleClose}>
					<Box
						sx={{ ...style, width: 255, borderRadius: "25px", backgroundColor: colors.primary[400] }}>
						<h3 id="child-modal-title" style={{ textAlign: "center" }}>
							Mew Academic Year
						</h3>
						<div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
							<div>
								<label>Name:</label>
								<input type="text" placeholder="Enter the name" />
							</div>
							<div>
								<label>Starting date:</label>
								<input type="date" />
							</div>
							<div>
								<label>Ending date:</label>
								<input type="date" />
							</div>
						</div>
            <Button
							onClick={handleClose}
							sx={{
								color: colors.grey[100],
								borderRadius: "10px",
								fontWeight: "bold",
								margin: "15px 0",
								":hover": {
									backgroundColor: colors.blueAccent[800],
									color: colors.greenAccent[500]
								},
								width: "75px",
								left: "125px",
								marginTop: "25px"
							}}>
							Create
						</Button>
					</Box>
				</Modal>
			</React.Fragment>
		);
  }
  