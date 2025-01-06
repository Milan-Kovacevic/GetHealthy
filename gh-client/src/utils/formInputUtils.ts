const handleIntegerOnValueChange = (e: any, field: any) => {
  if (!e.target.value) field.onChange(undefined);
  else if (isNaN(parseInt(e.target.value))) field.onChange(e.target.value);
  else field.onChange(parseInt(e.target.value));
};

const handleDecimalOnValueChange = (e: any, field: any) => {
  if (!e.target.value) field.onChange(undefined);
  else if (e.target.value.endsWith(".")) field.onChange(e.target.value);
  else if (isNaN(parseFloat(e.target.value))) field.onChange(e.target.value);
  else field.onChange(parseFloat(e.target.value));
};

export { handleDecimalOnValueChange, handleIntegerOnValueChange };
