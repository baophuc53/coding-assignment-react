import { User } from '@acme/shared-models';
import http from './../config/http';

export const getUsers = async (): Promise<User[]> => {
  const res = await http.get('users');
  return res.data;
};

export const getUserById = async (id?: number | null): Promise<User | null> => {
  if (!id) return null;
  const res = await http.get(`users/${id}`);
  return res.data;
};
