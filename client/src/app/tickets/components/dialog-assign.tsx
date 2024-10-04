import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Ticket, User } from '@acme/shared-models';
import { MenuItem } from '@mui/material';

export interface DialogAssignProps {
  onSubmit?: (payload: Partial<Ticket>) => void;
  options?: User[];
  open: boolean;
  toggle: VoidFunction;
  selectedRow?: Ticket;
}

export function DialogAssign({
  onSubmit,
  options,
  open,
  toggle,
  selectedRow,
}: DialogAssignProps) {
  return (
    <Dialog
      open={open}
      onClose={toggle}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const assigneeId = Number(formData.get('user') as string);
          if (assigneeId && selectedRow) {
            onSubmit?.({ assigneeId, id: selectedRow.id });
          }
          toggle();
        },
      }}
    >
      <DialogTitle>Assign User to Ticket</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="User"
          name="user"
          required
          fullWidth
          defaultValue={selectedRow?.assigneeId ?? ''}
        >
          {options?.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}
