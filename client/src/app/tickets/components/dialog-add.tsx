import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Ticket } from '@acme/shared-models';

export interface DialogAddProps {
  onSubmit?: (payload: Partial<Ticket>) => void;
  open: boolean;
  toggle: VoidFunction;
}

export function DialogAdd({ onSubmit, open, toggle }: DialogAddProps) {
  return (
    <Dialog
      open={open}
      onClose={toggle}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const description = formData.get('description') as string;
          onSubmit?.({ description });
          toggle();
        },
      }}
    >
      <DialogTitle>Add New Ticket</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          name="description"
          label="Description"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
