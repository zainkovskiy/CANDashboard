import React from "react";
import Link from '@mui/material/Link';


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
                    <span>{block.name}
                      <Link
                        target={'_blank'}
                        href={block.howlink}
                        underline="hover"
                        sx={{
                          fontSize: 12,
                          margin: '0 0 0 0.5rem'
                        }}
                      >
                        (Как это считалось)
                      </Link></span>
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
                  </div>
                  <Week
                    week={block.week ? block.week : ''}
                    curWeek={curWeek}
                    getDealyStatistic={getDealyStatistic}
                    blockUID={block.UID}
                    hasDailyStatistic={block.hasDailyStatistic}
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