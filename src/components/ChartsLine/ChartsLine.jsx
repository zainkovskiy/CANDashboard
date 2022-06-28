import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

moment.locale('ru')

export function ChartsLine({ currentStatistic }) {
  const [sliderWidth, setSliderWidth] = useState('');

  useEffect(() => {
    setSliderWidth(document.getElementById('root').clientWidth)
  }, [])

  const getDate = (el) => {
    return (
      moment(el.date).format("DD MMMM")
    )
  }
  const getIntroOfPage = (lables) => {
    return (
      <div>
        {
          lables.map((label, idx) =>
            <p
              key={idx}
              className='tooltip__intro'>{label.name}: {label.payload.value}
            </p>
          )
        }
      </div>
    )
  }
  const CustomToolTip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip">
          <p className="tooltip__label"
          >{label}</p>
          {getIntroOfPage(payload)}
        </div>
      );
    }

    return null;
  }
  return (
    < div className='charts' style={{ height: 450, padding: '1rem' }}>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart width='100%' height={400}
          data={currentStatistic.statistic}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDuplicatedCategory={false}
            dataKey={(el) => getDate(el)}
            style={{ fontFamily: 'Montserrat', fontSize: 12, cursor: 'pointer' }}
            onClick={(el) => {
              BX.SidePanel.Instance.open(`https://crm.centralnoe.ru/dev/dashboardTable/?date=${currentStatistic.year}-${currentStatistic.month}-${el.value.replace(/[^\d]/g, "")}&indicator=${currentStatistic.indicatorId}&officeId=${currentStatistic.officeId}&managerId=${currentStatistic.managerId}`, { animationDuration: 300, width: sliderWidth, })
            }}
          />
          <YAxis
            dataKey='value'
            style={{ fontFamily: 'Montserrat', fontSize: 12 }}
          />
          <Tooltip
            content={<CustomToolTip />}
          />
          <Legend
            wrapperStyle={{ fontFamily: 'Montserrat', fontSize: 12 }}
          />
          {
            currentStatistic?.statistic.map((line, idx) =>
              <Line
                key={idx}
                type="monotone"
                dataKey='value'
                data={line.data}
                name={line.name}
                stroke={line.color}
                strokeWidth={4}
                activeDot={{ r: 8 }}
              />
            )
          }
        </LineChart>
      </ResponsiveContainer>
      <span className='charts__text'>Нажмите на дату для просмотра статистики</span>
    </div>
  );
}

