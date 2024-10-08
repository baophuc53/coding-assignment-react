import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Tickets from './tickets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

describe('Tickets', () => {
  it('should render successfully', () => {
    const queryClient = new QueryClient();
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Tickets />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
  it('should show dialog when click button Add', async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Tickets />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const buttonElement = screen.getByText('Add');
    await userEvent.click(buttonElement)
    const dialogElement = screen.getByText("Add New Ticket");
    expect(dialogElement).toBeInTheDocument();
  });
});
