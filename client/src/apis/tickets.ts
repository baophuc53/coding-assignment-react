import { Ticket } from '@acme/shared-models';
import http from './../config/http';

export const getTickets = async (): Promise<Ticket[]> => {
  const res = await http.get('tickets');
  return res.data;
};

export const getTicketById = async (id: number): Promise<Ticket | null> => {
  if (!id) return null;
  const res = await http.get(`tickets/${id}`);
  return res.data;
};

export const postTicket = async (payload: Partial<Ticket>): Promise<Ticket> => {
  const res = await http.post('tickets', payload);
  return res.data;
};

export const completeTicket = async (id: number): Promise<void> => {
  const res = await http.put(`tickets/${id}/complete`);
  return res.data;
};

export const incompleteTicket = async (id: number): Promise<void> => {
  const res = await http.delete(`tickets/${id}/complete`);
  return res.data;
};

export const assignTicket = async ({
  id,
  assigneeId,
}: Partial<Ticket>): Promise<void> => {
  const res = await http.put(`tickets/${id}/assign/${assigneeId}`);
  return res.data;
};

export const unassignTicket = async (id: number): Promise<void> => {
  const res = await http.put(`tickets/${id}/unassign`);
  return res.data;
};
