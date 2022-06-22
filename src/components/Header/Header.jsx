import React, { useState, useEffect } from "react";
import moment from "moment";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import './Header.scss';

const monthList = [
  {
    count: 1,
    name: 'Январь',
  }, {
    count: 2,
    name: 'Февраль',
  },
  {
    count: 3,
    name: 'Март',
  },
  {
    count: 4,
    name: 'Апрель',
  },
  {
    count: 5,
    name: 'Май',
  },
  {
    count: 6,
    name: 'Июнь',
  },
  {
    count: 7,
    name: 'Июль',
  },
  {
    count: 8,
    name: 'Август',
  },
  {
    count: 9,
    name: 'Сентябрь',
  },
  {
    count: 10,
    name: 'Октябрь',
  },
  {
    count: 11,
    name: 'Ноябрь',
  },
  {
    count: 12,
    name: 'Декабрь',
  },
]

export function Header(props) {
  const { rights, officeListState, subordinatedState, getData, office, employee, setStateMount, setStateYear, request, setStateSource } = props;

  const [year, setYear] = useState(moment().format('YYYY'));
  const [month, setMonth] = useState(moment().format('M'));
  const [errorYear, setErrorYear] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [officeList, setOfficeList] = useState(officeListState);
  const [subordinated, setSubordinated] = useState(subordinatedState);

  useEffect(() => {
    if (moment().format('YYYY') === year && month > moment().format('M')) {
      setMonth('');
      setStateMount('')
    }
    if (year.length === 4) {
      if (moment().format('YYYY') < year || year < '2022') {
        setYear('');
        setStateYear('');
      }
    }
  }, [year])

  const handlerFilter = () => {
    if (year.length < 4) {
      setErrorYear(true)
      return
    }
    setErrorYear(false);
    if (rights === 'chief' && employee === 'all') {
      getData({
        action: "getOffice",
        userId: userId,
        officeId: office.ID,
        month: month,
        year: year
      })
    } else {
      getData({
        action: "getManager",
        userId: userId,
        month: month,
        year: year,
        managerId: employee.userId
      })
    }
  }
  return (<div className='header'>
    <img className='header__logo' src="https://crm.centralnoe.ru/dealincom/assets/logo_can.jpg" alt="logo" />

    <div className="header__filter">
      <FormControl size="small">
        <InputLabel id="demo-simple-select-label">Офис</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={office}
          label='Офис'
          name={'office'}
          onChange={event => { setStateSource(event.target.value, 'office'), setBtnDisabled(false) }}
          size='small'
          disabled={rights !== 'chief'}
        >
          {
            officeList?.length > 0 &&
            officeList.map(office =>
              <MenuItem key={office.ID} value={office}>{office.NAME}</MenuItem>)
          }
          {
            rights !== 'chief' &&
            <MenuItem value={office}>{office.NAME}</MenuItem>
          }
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel id="demo-simple-select-label">Сотрудник</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={employee}
          label='Сотрудник'
          name={'employee'}
          onChange={event => { setStateSource(event.target.value, 'employee'), setBtnDisabled(false) }}
          size='small'
          disabled={rights !== 'chief'}
        >
          {
            rights !== 'chief' &&
            <MenuItem value={employee}>{employee.NAME}</MenuItem>
          }
          {
            rights === 'chief' && subordinated?.length > 0 &&
            <MenuItem value='all'>Все</MenuItem>
          }
          {
            rights === 'chief' && subordinated?.length > 0 &&
            subordinated.map(employee =>
              +employee.officeId === +office.ID &&
              <MenuItem key={employee.userId} value={employee}>{employee.name}</MenuItem>)
          }
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ width: '100%' }}>
        <InputLabel id="demo-simple-select-label">{'Месяц'}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
          label={'Месяц'}
          name={'month'}
          onChange={event => { setMonth(event.target.value), setBtnDisabled(false), setStateMount(event.target.value) }}
          size='small'
        >
          {
            moment().format('YYYY') === year &&
            monthList.map(month =>
              month.count <= moment().format('M') &&
              <MenuItem key={month.count} value={month.count}>{month.name}</MenuItem>)
          }
          {
            moment().format('YYYY') !== year &&
            monthList.map(month =>
              <MenuItem key={month.count} value={month.count}>{month.name}</MenuItem>)
          }
        </Select>
      </FormControl>
      <TextField
        id="outlined-basic"
        label="Год"
        variant="outlined"
        size="small"
        value={year}
        onChange={event => { setYear(event.target.value.replace(/[^\d]/g, '').substring(0, 4)), setBtnDisabled(false), setStateYear(event.target.value.replace(/[^\d]/g, '').substring(0, 4)) }}
        disabled={moment().format('YYYY') === '2022'}
        error={errorYear}
      />
      <Button
        variant="contained"
        onClick={() => handlerFilter()}
        disabled={btnDisabled || request}
      >
        Применить
      </Button>
    </div>
  </div>)
}
