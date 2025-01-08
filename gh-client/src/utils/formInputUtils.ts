const handleIntegerOnValueChange = (e: any, field: any) => {
  // undefined will trigger setting default value again in react-hook-form, instead we use ""/null/0
  // if (!e.target.value) field.onChange(undefined);
  if (!e.target.value) field.onChange("");
  else if (isNaN(parseInt(e.target.value))) field.onChange(e.target.value);
  else field.onChange(parseInt(e.target.value));
};

const handleDecimalOnValueChange = (e: any, field: any) => {
  // if (!e.target.value) field.onChange(undefined);
  if (!e.target.value) field.onChange("");
  else if (e.target.value.endsWith(".")) field.onChange(e.target.value);
  else if (isNaN(parseFloat(e.target.value))) field.onChange(e.target.value);
  else field.onChange(parseFloat(e.target.value));
};

export { handleDecimalOnValueChange, handleIntegerOnValueChange };
