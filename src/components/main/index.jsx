import React, { useEffect, useState, useCallback } from 'react';
import { Container, Button, Chip, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuid } from 'uuid';
import {
  MainTitle,
  UrlTextField,
  AndSeparator,
  LineSeparator,
  ResultsContainer,
} from './styles';
import AndComponent from '../andCondition';
import { FilterArray } from '../../utils/filterBuilder';

const defaultCondition = {
  leftCondition: '',
  operator: 'Equals',
  conditionValue: '',
  orConditions: [],
};

const MainComponent = () => {
  const [jsonURL, setJsonURL] = useState(
    'https://data.nasa.gov/resource/y77d-th95.json'
  );
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [andConditions, setAndConditions] = useState([
    { id: uuid(), ...defaultCondition },
  ]);

  useEffect(() => {
    fetch(jsonURL)
      .then(response => response.json())
      .then(data => {
        setJsonData(data);
        setIsLoading(false);
      });
  }, []);

  const columnNames = jsonData ? Object.getOwnPropertyNames(jsonData[0]) : [];

  const columns = columnNames.map(column => {
    return {
      field: column,
      headerName: column,
      width: 150,
      editable: false,
    };
  });

  const addAndCondition = useCallback(e => {
    e.preventDefault();
    setAndConditions(andConditions => [
      ...andConditions,
      { id: uuid(), ...defaultCondition },
    ]);
  }, []);

  const removeAndCondition = id => {
    setAndConditions(andConditions =>
      andConditions.filter(condition => condition.id !== id)
    );
  };

  const updateAndCondition = useCallback((id, newCondition) => {
    setAndConditions(andConditions =>
      andConditions.map(condition => {
        return id === condition.id ? newCondition : condition;
      })
    );
  }, []);

  const areFiltersEmpty = andConditions.find(
    conditions =>
      conditions.leftCondition === '' || conditions.conditionValue === ''
  );

  const filteredData = !areFiltersEmpty
    ? FilterArray(jsonData, andConditions)
    : jsonData;

  const totalRecordsCount = isLoading ? 0 : jsonData.length;
  const filteredRecordsCount = isLoading ? 0 : filteredData.length;

  return (
    <Container maxWidth='lg'>
      <MainTitle>Condition Builder</MainTitle>
      <UrlTextField
        label='Url'
        variant='outlined'
        value={jsonURL}
        helperText={
          'Insert data url. Returning data MUST be an array json with each element is key/value pair.'
        }
      />
      {!isLoading && (
        <>
          {andConditions.map((condition, idx) => (
            <>
              <AndComponent
                key={condition.id}
                id={condition.id}
                and={condition}
                columns={columnNames}
                removeAndCondition={removeAndCondition}
                updateAndCondition={updateAndCondition}
              />
              {idx < andConditions.length - 1 && (
                <AndSeparator>
                  <LineSeparator />
                  AND
                  <LineSeparator />
                </AndSeparator>
              )}
            </>
          ))}
          <LineSeparator />
          <Button variant='outlined' onClick={e => addAndCondition(e)}>
            Add
          </Button>
        </>
      )}
      <ResultsContainer>
        <Typography variant='h5'>Results</Typography>
        <div>
          <Chip label={`Total: ${totalRecordsCount}`} />
          <Chip label={`Filtered: ${filteredRecordsCount}`} color='primary' />
        </div>
        {jsonData && (
          <div style={{ height: 700, width: '100%' }}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[20, 50, 100]}
            />
          </div>
        )}
      </ResultsContainer>
    </Container>
  );
};

export default MainComponent;
