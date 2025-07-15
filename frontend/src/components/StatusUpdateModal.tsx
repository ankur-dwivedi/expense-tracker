import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (newStatus: string) => void;
  currentStatus: string;
}

const StatusUpdateModal: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  currentStatus,
}) => {
  const [status, setStatus] = useState(currentStatus);
  
  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onConfirm(status)} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusUpdateModal;
