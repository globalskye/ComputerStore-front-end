import * as React from 'react';
import { Checkbox, FormGroup } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

export interface RadioButtonsGroupProps {
  name: string;
  options: { value: string; label: string }[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxButtonsGroup = (props: RadioButtonsGroupProps) => {
  return (
    <FormControl>
      <FormLabel id="checkbox-buttons-group-label">{props.name}</FormLabel>
      <FormGroup
        aria-labelledby="checkbox-buttons-group-label"
        defaultValue="female"
        onChange={props.onChange}>
        {props.options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Checkbox />}
            label={option.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxButtonsGroup;
