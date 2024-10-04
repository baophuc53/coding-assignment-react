import { Routes, Route } from 'react-router-dom';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import TicketDetails from './ticket-details/ticket-details';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 5 * 60 * 100 milliseconds
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles['app']}>
        <h1>Ticketing App</h1>
        <Routes>
          <Route path="/" element={<Tickets />} />
          {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
          <Route path="/:id" element={<TicketDetails />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
