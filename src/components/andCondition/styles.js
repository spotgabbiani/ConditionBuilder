import { Box, Paper } from '@mui/material';
import styled from 'styled-components';

export const StyledPaper = styled(Paper)`
  padding: 24px;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const PlaceHolder = styled.div`
  width: 100%;
  height: 45px;
  background: #828282;
  margin: 25px 0;
  display: ${props => (props.showPlaceholder ? 'flex' : 'none')};
`;
