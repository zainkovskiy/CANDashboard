import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './HistoryList.scss';

export const HistoryList = ({ managerId, officeId, month, year }) => {
console.log("🚀 ~ file: HistoryList.jsx ~ line 13 ~ HistoryList ~ year", year)
console.log("🚀 ~ file: HistoryList.jsx ~ line 13 ~ HistoryList ~ month", month)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory();
  }, [])

  const getHistory = async () => {
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Statistic/HistoryPurchase.php', {
        "managerId": managerId,
        "officeId": officeId,
        "mounth": month,
        "year": year,
      })
      if (res?.data) {
        setData(res.data)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat', display: 'flex', justifyContent: 'space-between' }}
      >
        История покупок
        <span style={{ fontSize: 12 }}>Баланс {data?.balance}&#8381;</span>
      </DialogTitle>
      <DialogContent>
        {
          loading ?
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box> :
            <div className='history-list'>
              {
                data?.history?.length > 0 &&
                data.history.map((item, idx) =>
                  <HistoryItem
                    item={item}
                    key={idx}
                  />
                )
              }
            </div>
        }
      </DialogContent>
    </>
  )
}

const HistoryItem = ({ item }) => {

  const openCard = () => {
    BX.SidePanel.Instance.open(item.objLink, { animationDuration: 300, width: document.getElementById('root').clientWidth })
  }

  return (
    <div
      className={`history-item ${item.objLink ? 'history-item_link' : ''}`}
      onClick={item.objLink && openCard}
    >
      <span className='history-item__text history-item__text_bold'>
        {moment(item.created).locale('ru').format('DD MMMM YYYY')}
      </span>
      <div className='history-item__bottom'>
        <img className='history-item__img' src={item.picture} alt="img" />
        <div className='history-item__info'>
          <div>
            <span className='history-item__text history-item__text_small'>{item.userName}</span>
            <span className='history-item__text'>{item.itemName}</span>
            <span className='history-item__text history-item__text_small'>
              {item.payStatus === 'locked' && 'Заблокировано'}
              {item.payStatus === 'success' && 'Успешно'}
            </span>
          </div>
          <span className={`history-item__text history-item__text_bold ${ item.costType === 'add' ? 'history-item__text_green' : '' }`}>
            {item.costType === 'substract' && '-'}
            {item.costType === 'add' && '+'}
            {item.cost}&#8381;
          </span>
        </div>
      </div>
    </div>
  )
} 