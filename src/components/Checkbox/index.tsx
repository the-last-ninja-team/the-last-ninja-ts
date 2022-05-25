import React, { ChangeEvent, FC, PropsWithChildren } from 'react';

import type { CheckboxProps } from './interfaces';

export const Checkbox: FC<PropsWithChildren<CheckboxProps>> = ({
  id,
  checked = false,
  onChecked,
  disabled = false,
  children,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    onChecked?.(target.checked);
  };

  return (
    <div className="checkbox__element">
      <label htmlFor={id}>
        <input disabled={disabled} type="checkbox" id={id} checked={checked} onChange={handleChange} />
        {children}
      </label>
    </div>
  );
};
