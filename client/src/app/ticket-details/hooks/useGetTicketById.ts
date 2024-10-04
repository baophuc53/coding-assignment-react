import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './../../../constant';
import { getTicketById } from './../../../apis';

export const useGetTicketById = (id: number) => {
  const query = useQuery({
    queryKey: [QueryKey.TicketDetail, id],
    queryFn: () => getTicketById(id),
    enabled: !!id,
  });
  return query;
};
