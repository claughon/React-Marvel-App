import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

interface inputType{
    name: string;
    placeholder: string; 
}

export const Input = forwardRef((props:inputType, ref) => {
    return(
        <TextField
            variant = 'outlined'
            margin = 'normal'
            inputRef = {ref}
            label = {props.placeholder}
            fullWidth
            type = 'text'
            {...props}
        ></TextField>
    );
});

