import { Box, Paper } from '@mui/material';
import styled from 'styled-components';

export const StyledPaper = styled(Paper)`
  padding: 24px;
  margin: 15px 0;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const OrTitle = styled.div`
  margin: 0px 16px;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  font-weight: 700;
  font-size: 20px;
  color: rgb(25, 118, 210);
  text-transform: uppercase;
`;

export const PlaceHolder = styled.div`
  width: 100%;
  height: 45px;
  background: #828282;
  margin: 25px 0;
  display: ${props => (props.showPlaceholder ? 'flex' : 'none')};
`;
