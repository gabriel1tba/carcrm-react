import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core';

function Confirm({ open, title, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle disableTypography>
        <h6>{title ? title : 'Tem certeza que deseja prosseguir?'}</h6>
      </DialogTitle>
      <DialogActions className="d-flex justify-content-center mb-2">
        <Button onClick={() => onClose()}>Não</Button>
        <Button
          onClick={() => {
            onClose();
            onConfirm();
          }}
          variant="contained"
          color="primary"
        >
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Confirm;
