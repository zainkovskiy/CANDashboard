import React from "react";

import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export function BorderLinearProgress(props) {
  const { performance } = props

  const getGradient = () => {
    if(performance < 12){
      return 'linear-gradient(90deg, rgba(255,0,0,1) 95%, rgba(255,171,0,1) 100%)'
    }
    if (performance < 25) {
      return 'linear-gradient(90deg, rgba(255,0,0,1) 27%, rgba(255,171,0,1) 100%)'
    }
    if (performance >= 25 && performance <= 50) {
      return 'linear-gradient(90deg, rgba(255,154,0,1) 23%, rgba(219,255,0,1) 100%)'
    }
    if (performance > 50 && performance < 80) {
      return 'linear-gradient(90deg, rgba(219,255,0,1) 44%, rgba(56,255,0,1) 100%)'
    }
    if (performance >= 80) {
      return '#92ff00'
    }
  }

  const CustomLinear = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      background: getGradient(),
    },
  }));

  return (
    <CustomLinear variant="determinate" value={performance > 100 ? 100 : performance} />
  )
}