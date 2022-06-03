import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import './Charts.scss';

moment.locale('ru')
const name = 'Название показателя'
// const data = [
//   {
//     "date": "2022-01-01",
//     "value": 40,
//     "title": 'blablabla'
//   },
//   {
//     "date": "2022-01-02",
//     "value": 90,
//     "title": 'blablabla'
//   },
//   {
//     "date": "2022-01-03",
//     "value": 4,
//     "title": 'blablabla'
//   },
//   {
//     "date": "2022-01-04",
//     "value": 400,
//     "title": 'blablabla'
//   },
//   {
//     "date": "2022-01-05",
//     "value": 459,
//     "title": 'blablabla'
//   },
//   {
//     "date": "2022-01-06",
//     "value": 4123,
//     "title": 'blablabla'
//   },
//   {
//     "date": "2022-01-07",
//     "value": 40,
//     "title": 'blablabla'
//   }
// ];

export function Charts({ currentStatistic }) {
  const [sliderWidth, setSliderWidth] = useState('');

  useEffect(() => {
    setSliderWidth(document.getElementById('root').clientWidth)
  }, [])

  const getDate = (el) => {
    return (
      moment(el.date).format("DD MMMM")
    )
  }
  const getIntroOfPage = (item) => {
    return (
      <div>
        {
          <p className='tooltip__intro'>{item.payload.title}: {item.payload.value}</p>
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
          {getIntroOfPage(payload[0])}
        </div>
      );
    }

    return null;
  }
  return (
    <>
      {
        currentStatistic?.statistic?.length > 0 ?
          < div className='charts' style={{ height: 450, padding: '1rem' }}>
            <ResponsiveContainer width='100%' height={400}>
              <LineChart width='100%' height={400}
                data={data}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={(el) => getDate(el)}
                  style={{ fontFamily: 'Montserrat', fontSize: 12, cursor: 'pointer' }}
                  // onClick={(el) => console.log(el)}
                  onClick={() => BX.SidePanel.Instance.open(`https://crm.centralnoe.ru/dev/dashboardTable`, { animationDuration: 300, width: sliderWidth, })}
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
                <Line name={name} type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={4} activeDot={{ r: 8 }} />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
              </LineChart>
            </ResponsiveContainer>
            <span className='charts__text'>please, click date</span>
          </div> :
          <p className="text" style={{padding: '0 1rem'}}>Нет данных</p>
      }
    </>
  );

}
