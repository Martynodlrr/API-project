import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const VisuallyHiddenInput = styled('input')({
  display: 'none',
});

export default function InputFileUpload({ label, startIcon, onChange }) {
  return (
    <Button component="label" variant="standard" startIcon={startIcon}>
      {label}
      <VisuallyHiddenInput type="file" onChange={onChange} />
    </Button>
  );
}
