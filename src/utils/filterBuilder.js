const FilterArray = (data, conditions) => {
  const filters = conditions.map(condition => [
    {
      field: condition.leftCondition,
      operator: condition.operator,
      value: condition.conditionValue,
    },
    ...condition.orConditions.map(condition => ({
      field: condition.leftCondition,
      operator: condition.operator,
      value: condition.conditionValue,
    })),
  ]);

  const operators = {
    Equals: (field, value) => field === value,
    GreaterThan: (field, value) => parseFloat(value) < parseFloat(field),
    LessThan: (field, value) => parseFloat(value) > parseFloat(field),
    Contain: (field, value) => field.includes(value),
    NotContain: (field, value) => field.indexOf(value) === -1,
    Regex: (field, value) => {
      if (!field) return false;
      const pattern = new RegExp(field, 'i');
      return pattern.test(value);
    },
  };

  const result = data.filter(item =>
    filters.every(condition =>
      condition.some(({ field, operator, value }) =>
        operators[operator](item[field], value)
      )
    )
  );

  return result;
};

export { FilterArray };
