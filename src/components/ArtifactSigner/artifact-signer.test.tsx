import React from 'react';
import { render, screen } from '@testing-library/react';

test('expect sample-component to render children', () => {
  const { container } = render(<div>Sample Component</div>);
  expect(container).toMatchSnapshot();
  expect(screen.getByText('Sample Component')).toBeInTheDocument();
});

export {};
