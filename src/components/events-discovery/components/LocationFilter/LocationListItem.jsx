import { styled } from '@mui/material/styles';

export const LocationListItem = styled('li')(() => ({
  '&.Mui-focused': {
    backgroundColor: '#CCEBF0!important',
    textDecoration: 'underline',
    color: '#006B81!important',
    '&:hover': {
      backgroundColor: '#CCEBF0!important',
    },
  },
}));
