import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ChartsBar({ currentStatistic }) {
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
              className='tooltip__intro'>{label.name}: {label.value}
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
    <div className='charts' style={{ height: 450, padding: '1rem' }}>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart
          width={500}
          height={300}
          data={currentStatistic.statistic.data}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            style={{ fontFamily: 'Montserrat', fontSize: 12, cursor: 'pointer' }}
            dataKey={el => getDate(el)}
            onClick={(el) => {
              BX.SidePanel.Instance.open(`https://crm.centralnoe.ru/dev/dashboardTable/?date=${currentStatistic.year}-${currentStatistic.month}-${el.value.replace(/[^\d]/g, "")}&indicator=${currentStatistic.indicatorId}&officeId=${currentStatistic.officeId}&managerId=${currentStatistic.managerId}`, { animationDuration: 300, width: sliderWidth, })
            }}
          />
          <YAxis
            style={{ fontFamily: 'Montserrat', fontSize: 12 }}
          />
          <Tooltip
            content={<CustomToolTip />}
          />
          <Legend
            wrapperStyle={{ fontFamily: 'Montserrat', fontSize: 12 }}
          />
          {
            currentStatistic.statistic.value.map((value, idx) =>
              <Bar
                key={idx}
                dataKey={value}
                name={currentStatistic.statistic.name[value]}
                stackId={currentStatistic.statistic.index[value]}
                fill={currentStatistic.statistic.color[value]}
              >
                {
                  currentStatistic.statistic.data.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={currentStatistic.statistic.color[value]} />
                  )
                }
              </Bar>
            )
          }
        </BarChart>
      </ResponsiveContainer>
      <span className='charts__text'>Нажмите на дату для просмотра статистики</span>
    </div>
  );

}