import React from "react";
import Button from '@mui/material/Button';

import { BorderLinearProgress } from 'components/BorderLinearProgress';
import { Week } from 'components/Week';

import './Statistics.scss';

export function Statistics(props) {
  const { statistic, curWeek, getDealyStatistic } = props;
  return (
    <div className="statistics">
      {
        statistic?.length > 0 ?
          statistic.map(block =>
            <div key={block.UID} className="statistic">
              {
                block.month &&
                <>
                  <div className="statistic__header">
                    <span>{block.name}</span>
                    <span>{block.month.performance}% Месяц</span>
                  </div>
                  <div className="statistic__body">
                    <div>
                      <BorderLinearProgress
                        performance={block.month.performance}
                      />
                      <div style={{ margin: '0.5rem 0 0 0' }}>
                        <span className="text"> План {block.month.plan} {block.unit && block.unit}</span> /
                        <span className="text"> Факт {block.month.fact} {block.unit && block.unit}</span>
                      </div>
                    </div>
                    {
                      block.hasDailyStatistic &&
                      <Button
                        variant="outlined"
                        style={{ alignSelf: 'flex-start' }}
                        onClick={() => {getDealyStatistic(block.UID)}}
                      >
                        По дням
                      </Button>
                    }
                  </div>
                    <Week
                      week={block.week ? block.week : ''}
                      curWeek={curWeek}
                    />
                </>
              }
            </div>
          ) :
          <span className="text">нет даннах</span>
      }
    </div>
  )
}