import React, { useState } from 'react';

import Button from '@mui/material/Button';

import { ModalWindow } from 'components/ModalWindow';
import { HistoryList } from 'components/HistoryList';

import './History.scss';

export function History({ managerId, officeId, month, year }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span
        className="history"
      >
        История покупок
        <Button
          variant="outlined"
          size="small"
          onClick={() => setOpen(!open)}
        >
          Показать
        </Button>
      </span>
      <ModalWindow
        open={open}
        onClose={() => setOpen(!open)}
        maxWidth='md'
        children={<HistoryList 
          managerId={ managerId }
          officeId={ officeId }
          month={ month }
          year={ year }
        />}
      />
    </>
  )
}


