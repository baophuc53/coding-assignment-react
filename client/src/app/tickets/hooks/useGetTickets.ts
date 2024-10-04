import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './../../../constant';
import { getTickets } from './../../../apis';

export const useGetTickets = () => {
  const query = useQuery({
    queryKey: [QueryKey.TicketList],
    queryFn: getTickets,
  });
  return query;
};
