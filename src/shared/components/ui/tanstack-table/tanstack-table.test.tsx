import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import {
  TanstackTable,
  TanstackTableBody,
  TanstackTableCell,
  TanstackTableHead,
  TanstackTableHeader,
  TanstackTableRow,
} from './index';

describe('TanstackTable', () => {
  it('renders head and body rows', () => {
    render(
      <TanstackTable>
        <TanstackTableHeader>
          <TanstackTableRow>
            <TanstackTableHead>Name</TanstackTableHead>
          </TanstackTableRow>
        </TanstackTableHeader>
        <TanstackTableBody>
          <TanstackTableRow>
            <TanstackTableCell>Jane</TanstackTableCell>
          </TanstackTableRow>
        </TanstackTableBody>
      </TanstackTable>,
    );

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });
});
