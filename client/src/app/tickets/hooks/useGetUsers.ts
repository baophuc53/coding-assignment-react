import { useQuery } from '@tanstack/react-query';
import { QueryKey } from './../../../constant';
import { getUsers } from './../../../apis';

export const useGetUsers = () => {
  const query = useQuery({
    queryKey: [QueryKey.UserList],
    queryFn: getUsers,
  });
  return query;
};
