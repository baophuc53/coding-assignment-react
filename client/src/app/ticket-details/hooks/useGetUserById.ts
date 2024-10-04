import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './../../../constant';
import { getUserById } from './../../../apis';

export const useGetUserById = (id?: number | null) => {
  const query = useQuery({
    queryKey: [QueryKey.UserDetail, id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
  return query;
};
