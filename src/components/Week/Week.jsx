import React, { useState } from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

import { BorderLinearProgress } from 'components/BorderLinearProgress';

import './Week.scss';

export function Week(props) {
  const { curWeek, week, getDealyStatistic, blockUID, hasDailyStatistic  } = props;
  const indexCurrentWeek = week ? week.indexOf(week.find(item => item.UID === +curWeek)) : '';
  const [value, setValue] = useState(indexCurrentWeek);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='week'>
      <Accordion disabled={!week}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ backgroundColor: 'aliceblue' }}
          sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5, }}
        >
          {week && <span className="text">По неделям</span>}
        </AccordionSummary>
        <AccordionDetails>
          {
            week &&
            <>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
              >
                {
                  week.map((item, idx) =>
                    <Tab
                      key={item.UID}
                      label={`Неделя ${idx + 1}`}
                      id={`simple-tab-${idx}`}
                      aria-controls={`simple-tabpanel-${idx}`}
                    />
                  )
                }
              </Tabs>
              {
                week.map((item, idx) =>
                  <div
                    className='week__tabs-panel'
                    hidden={value !== idx}
                    key={item.UID}
                    value={value}
                    index={idx}
                  >
                    <BorderLinearProgress
                      performance={item.performance}
                    />
                    <div className='week__bottom'>
                      <div>
                        <span className="text"> План {item.plan}</span> /
                        <span className="text"> Факт {item.fact}</span>
                      </div>
                      {
                        hasDailyStatistic &&
                        <Button
                          variant="outlined"
                          style={{ alignSelf: 'flex-start' }}
                          onClick={() => { getDealyStatistic(blockUID, item.UID) }}
                        >
                          Подробнее
                        </Button>
                      }
                    </div>
                  </div>
                )
              }
            </>
          }
        </AccordionDetails>
      </Accordion>
    </div>
  )
}