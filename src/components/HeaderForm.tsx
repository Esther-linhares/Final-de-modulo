import { Typography } from '@mui/material';
import React from 'react';

interface HeaderFormProps {
    title: string;
    color: string;
}

const HeaderForm: React.FC<HeaderFormProps> = ({ title,color}) => {
  return (
    <>
      <Typography color={color} variant="h4">{title} </Typography>
    </>
  );
};

export default HeaderForm;
