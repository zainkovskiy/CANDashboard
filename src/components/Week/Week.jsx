import React, { useState } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';

import { BorderLinearProgress } from 'components/BorderLinearProgress';

import './Week.scss';

export function Week(props) {
  const { curWeek, week, getDealyStatistic, blockUID, hasDailyStatistic } = props;
  const indexCurrentWeek = week ? week.indexOf(week.find(item => item.UID === +curWeek)) : '';
  const [value, setValue] = useState(indexCurrentWeek);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
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
    </>
  )
}