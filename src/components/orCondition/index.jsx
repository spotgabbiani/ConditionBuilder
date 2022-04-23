import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Delete, ControlPoint } from '@mui/icons-material/';
import { StyledPaper, StyledBox, OrTitle, PlaceHolder } from './styles';

const OrComponent = ({
  id,
  idx,
  or,
  columns,
  addOrCondition,
  removeOrCondition,
  updateOrCondition,
}) => {
  const [orCondition, setOrCondition] = useState({ ...or });
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    validateInputs();
    updateOrCondition(idx, orCondition);
  }, [orCondition, idx, updateOrCondition]);

  const handleLeftConditionChange = useCallback(event => {
    const {
      target: { value },
    } = event;
    setOrCondition(orCondition => ({
      ...orCondition,
      leftCondition: value,
    }));
  }, []);

  const handleOperatorChange = useCallback(event => {
    const {
      target: { value },
    } = event;
    setOrCondition(orCondition => ({ ...orCondition, operator: value }));
  }, []);

  const handleValueChange = useCallback(event => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setOrCondition(orCondition => ({
      ...orCondition,
      conditionValue: value,
    }));
  }, []);

  const validateInputs = () => {
    if (
      orCondition.operator === 'GreaterThan' ||
      orCondition.operator === 'LessThan'
    ) {
      setValidationError(
        isNaN(orCondition.conditionValue)
          ? `Please enter only numbers with ${orCondition.operator} condition`
          : ''
      );
    }
  };
  return (
    <>
      <StyledPaper key={id}>
        <StyledBox>
          <OrTitle>OR</OrTitle>
          <FormControl fullWidth>
            <InputLabel id='left-condition-label'>Left condition</InputLabel>
            <Select
              labelId='left-condition-label'
              id='left-condition'
              value={or.leftCondition}
              onChange={e => handleLeftConditionChange(e)}
            >
              {columns.map((column, idx) => {
                return (
                  <MenuItem key={idx} value={column}>
                    {column}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='operator-label'>Operator</InputLabel>
            <Select
              labelId='operator-label'
              id='operator'
              label='Operator'
              value={or.operator}
              onChange={e => handleOperatorChange(e)}
            >
              <MenuItem value={'Equals'}>Equals</MenuItem>
              <MenuItem value={'GreaterThan'}>GreaterThan</MenuItem>
              <MenuItem value={'LessThan'}>LessThan</MenuItem>
              <MenuItem value={'Contain'}>Contain</MenuItem>
              <MenuItem value={'NotContain'}>Not Contain</MenuItem>
              <MenuItem value={'Regex'}>Regex</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              error={validationError}
              label={!validationError ? 'Value' : 'Error'}
              variant='outlined'
              value={or.conditionValue}
              onChange={e => handleValueChange(e)}
              helperText={validationError}
            />
          </FormControl>
          <ControlPoint
            onClick={() => addOrCondition(idx + 1)}
            onMouseEnter={() => setShowPlaceholder(true)}
            onMouseLeave={() => setShowPlaceholder(false)}
          />
          <Delete onClick={() => removeOrCondition(idx)} />
        </StyledBox>
      </StyledPaper>
      <PlaceHolder showPlaceholder={showPlaceholder} />
    </>
  );
};

export default OrComponent;
