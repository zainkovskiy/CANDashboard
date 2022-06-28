import React from 'react';

import { ChartsLine } from 'components/ChartsLine';
import { ChartsBar } from 'components/ChartsBar';

import './Charts.scss';

export function Charts({ currentStatistic }) {

  return (
    <>
      {
        currentStatistic?.hasStatistic ?
          <>
            {
              currentStatistic.type === 'chartsLine' &&
              <ChartsLine currentStatistic={currentStatistic}/>
            }
            {
              currentStatistic.type === 'chartsBar' &&
              <ChartsBar currentStatistic={currentStatistic}/>
            }
          </> :
          <p className="text" style={{ padding: '0 1rem' }}>Нет данных</p>
      }
    </>
  );

}

