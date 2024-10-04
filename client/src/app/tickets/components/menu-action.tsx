import { MoreHoriz } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';

export interface TicketDetailsProps {
  items: {
    name: string;
    onClick?: VoidFunction;
    disabled?: boolean;
  }[];
}

export const MenuAction = ({ items }: TicketDetailsProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHoriz />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items?.map(({ onClick, name, disabled }, index) => {
          const handleClick = () => {
            onClick?.();
            handleClose();
          };
          return (
            <MenuItem key={index} onClick={handleClick} disabled={disabled}>
              {name}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
