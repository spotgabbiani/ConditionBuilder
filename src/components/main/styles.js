import { TextField, Box } from '@mui/material';
import styled from 'styled-components';

export const MainTitle = styled.div`
  font-size: 3rem;
  line-height: 1.167;
  letter-spacing: 0em;
  font-weight: 700;
`;

export const UrlTextField = styled(TextField)`
  width: 100%;
`;

export const AndSeparator = styled(Box)`
  display: flex;
  flex-direction: column;
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  font-weight: 700;
  color: gray;
`;

export const LineSeparator = styled.div`
  height: 30px;
  width: 2px;
  background: rgb(225, 229, 233);
  margin: 0px auto;
`;

export const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
