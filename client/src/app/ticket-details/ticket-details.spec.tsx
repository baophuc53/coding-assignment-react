import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketDetails from './ticket-details';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

describe('TicketDetails', () => {
  it('should render successfully', () => {
    const queryClient = new QueryClient();
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <TicketDetails />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it('should return list page when click to Link', async () => {
    const queryClient = new QueryClient();
    const user = userEvent.setup();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <TicketDetails />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const linkElement = screen.getByText('Back to list');
    await user.click(linkElement);
    expect(window.location.pathname).toEqual('/');
  });
});
