import React from 'react';
import { render } from '@testing-library/react';
import Auth from './Auth';

test('renders without crashing', () => {
  const { baseElement } = render(<Auth />);
  expect(baseElement).toBeDefined();
});
