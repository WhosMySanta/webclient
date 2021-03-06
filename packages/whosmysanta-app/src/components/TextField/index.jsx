/* @flow */

import React from 'react';

import type {OnChangeEventFn} from '../Create';


type Props = {
  id: string,
  label?: string,
  onChange?: OnChangeEventFn,
  type?: 'email' | 'text',
  value?: string,
};

const TextField = ({
  id,
  label,
  onChange,
  type = 'text',
  value,
}: Props) => (
  <span>
    {label && <label htmlFor={id}>{label}</label>}
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
    />
  </span>
);


export default TextField;
