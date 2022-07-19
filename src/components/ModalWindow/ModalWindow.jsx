import React from "react";
import Dialog from '@mui/material/Dialog';

export function ModalWindow(props) {
  const { onClose, open, children, maxWidth } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxWidth || 'lg'}
      sx={{zIndex: 999}}
      scroll={'paper'}
    >
      {children}
    </Dialog>
  )
}