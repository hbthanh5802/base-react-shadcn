import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TooltipBubbleContent } from './index';

describe('TooltipBubbleContent', () => {
  it('renders label and list items', () => {
    render(<TooltipBubbleContent label="Label" items={['Title 1', 'Title 2']} />);
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
  });
});
