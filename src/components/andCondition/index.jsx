import React, { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Delete, ControlPoint } from '@mui/icons-material/';
import OrComponent from '../orCondition';
import { StyledPaper, StyledBox, PlaceHolder } from './styles';

const defaultCondition = {
  leftCondition: '',
  operator: 'Equals',
  conditionValue: '',
};

const AndComponent = ({
  id,
  and,
  columns,
  removeAndCondition,
  updateAndCondition,
}) => {
  const [andCondition, setAndCondition] = useState(and);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    validateInputs();
    updateAndCondition(id, andCondition);
  }, [andCondition, id, updateAndCondition]);

  const handleLeftConditionChange = useCallback(event => {
    const {
      target: { value },
    } = event;
    setAndCondition(andCondition => ({
      ...andCondition,
      leftCondition: value,
    }));
  }, []);

  const handleOperatorChange = useCallback(event => {
    const {
      target: { value },
    } = event;
    setAndCondition(andCondition => ({ ...andCondition, operator: value }));
  }, []);

  const handleValueChange = useCallback(event => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setAndCondition(andCondition => ({
      ...andCondition,
      conditionValue: value,
    }));
  }, []);

  const addOrConditionAtBegining = useCallback(
    e => {
      setAndCondition(andCondition => {
        const newOrs = [...andCondition.orConditions];
        newOrs.splice(0, 0, { ...defaultCondition });
        return {
          ...andCondition,
          orConditions: newOrs,
        };
      });
    },
    [setAndCondition]
  );

  const addOrCondition = useCallback(
    idx => {
      setAndCondition(andCondition => {
        const newOrs = [...andCondition.orConditions];
        newOrs.splice(idx, 0, { ...defaultCondition });
        return {
          ...andCondition,
          orConditions: newOrs,
        };
      });
    },
    [setAndCondition]
  );

  const removeOrCondition = useCallback(
    idx => {
      setAndCondition(andCondition => {
        const newOrs = [...andCondition.orConditions];
        newOrs.splice(idx, 1);
        return {
          ...andCondition,
          orConditions: newOrs,
        };
      });
    },
    [setAndCondition]
  );

  const updateOrCondition = useCallback((idx, newCondition) => {
    setAndCondition(andCondition => {
      const newOrs = [...andCondition.orConditions];
      newOrs.splice(idx, 1, newCondition);
      return {
        ...andCondition,
        orConditions: newOrs,
      };
    });
  }, []);

  const validateInputs = () => {
    if (
      andCondition.operator === 'GreaterThan' ||
      andCondition.operator === 'LessThan'
    ) {
      setValidationError(
        isNaN(andCondition.conditionValue)
          ? `Please enter only numbers with ${andCondition.operator} condition`
          : ''
      );
    }
  };
  return (
    <StyledPaper key={id}>
      <StyledBox>
        <FormControl fullWidth>
          <InputLabel id='left-condition-label'>Left condition</InputLabel>
          <Select
            labelId='left-condition-label'
            id='left-condition'
            value={andCondition.leftCondition}
            onChange={handleLeftConditionChange}
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
            value={andCondition.operator}
            onChange={handleOperatorChange}
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
            value={andCondition.conditionValue}
            onChange={handleValueChange}
            helperText={validationError}
          />
        </FormControl>
        <ControlPoint
          onClick={e => addOrConditionAtBegining(e)}
          onMouseEnter={() => setShowPlaceholder(true)}
          onMouseLeave={() => setShowPlaceholder(false)}
        />
        <Delete onClick={() => removeAndCondition(id)} />
      </StyledBox>
      <PlaceHolder showPlaceholder={showPlaceholder} />
      {andCondition.orConditions.map((orCondition, idx) => {
        return (
          <OrComponent
            key={idx}
            id={orCondition.id}
            idx={idx}
            or={orCondition}
            columns={columns}
            addOrCondition={addOrCondition}
            removeOrCondition={removeOrCondition}
            updateOrCondition={updateOrCondition}
          />
        );
      })}
    </StyledPaper>
  );
};

export default AndComponent;
