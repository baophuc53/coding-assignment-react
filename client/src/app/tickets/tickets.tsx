import styles from './tickets.module.css';
import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  Grid2 as Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetTickets, useGetUsers, useToggle } from './hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  assignTicket,
  completeTicket,
  incompleteTicket,
  postTicket,
  unassignTicket,
} from './../../apis';
import { MenuAction, DialogAdd, DialogAssign } from './components';
import { Add } from '@mui/icons-material';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { scrollToLastRow } from './../../utils';
import { Ticket } from '@acme/shared-models';
import { QueryKey } from './../../constant';

enum EStatus {
  None = 0,
  Complete = 1,
  Incomplete,
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TicketsProps {}

export function Tickets(props: TicketsProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: tickets, refetch, isFetching: isLoadingList } = useGetTickets();
  const { data: users } = useGetUsers();
  const [updateAdd, setUpdateAdd] = useState<boolean>();
  const [openAdd, toggleAdd] = useToggle();
  const [openAssign, toggleAssign] = useToggle();
  const [selectedRow, setSelectedRow] = useState<Ticket>();
  const [filterStatus, setFilterStatus] = useState<EStatus>(EStatus.None);

  const userMaps = useMemo(() => {
    return users?.reduce((prev, curr) => {
      prev[curr.id] = curr.name;
      return prev;
    }, {} as { [key: string]: string });
  }, [users]);

  useEffect(() => {
    if (updateAdd === undefined) return;

    // scroll to last newest row after add success
    scrollToLastRow();
  }, [updateAdd]);

  const { mutateAsync: mutateAddTicket, isPending: isPendingAdd } = useMutation(
    {
      mutationFn: postTicket,
    }
  );

  const { mutate: mutateComplete, isPending: isPendingComplete } = useMutation({
    mutationFn: completeTicket,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKey.TicketList],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.TicketDetail],
      });
    },
  });

  const { mutate: mutateIncomplete, isPending: isPendingIncomplete } =
    useMutation({
      mutationFn: incompleteTicket,
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({
          queryKey: [QueryKey.TicketList],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKey.TicketDetail],
        });
      },
    });

  const { mutate: mutateAssign, isPending: isPendingAssign } = useMutation({
    mutationFn: assignTicket,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKey.TicketList],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.TicketDetail],
      });
    },
  });

  const { mutate: mutateUnassign, isPending: isPendingUnassign } = useMutation({
    mutationFn: unassignTicket,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [QueryKey.TicketList],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.TicketDetail],
      });
    },
  });

  const handleAddTicket = useCallback(
    async (payload: Partial<Ticket>) => {
      try {
        await mutateAddTicket(payload);
        await refetch();
        setUpdateAdd((prev) => !prev);
      } catch (error) {
        alert('Error when add ticket!');
      }
    },
    [mutateAddTicket, refetch]
  );

  const handleComplete = useCallback(
    async (id: number, currentStatus: boolean) => {
      const mutate = currentStatus ? mutateIncomplete : mutateComplete;
      return mutate(id);
    },
    [mutateComplete, mutateIncomplete]
  );

  const handleOpenAssign = useCallback(
    (row: Ticket) => {
      setSelectedRow(row);
      toggleAssign();
    },
    [toggleAssign]
  );

  const handleSubmitAssign = useCallback(
    (payload: Partial<Ticket>) => {
      return mutateAssign(payload);
    },
    [mutateAssign]
  );

  const filteredList = useMemo(() => {
    if (!filterStatus) return tickets;
    return tickets?.filter((el) => {
      return filterStatus === EStatus.Complete
        ? el.completed === true
        : el.completed === false;
    });
  }, [filterStatus, tickets]);

  const isLoading = useMemo(() => {
    return (
      isLoadingList ||
      isPendingAdd ||
      isPendingComplete ||
      isPendingIncomplete ||
      isPendingAssign ||
      isPendingUnassign
    );
  }, [
    isLoadingList,
    isPendingAdd,
    isPendingAssign,
    isPendingComplete,
    isPendingIncomplete,
    isPendingUnassign,
  ]);

  return (
    <div className={styles['tickets']}>
      <h2>Tickets</h2>
      <Grid
        container
        size={12}
        justifyContent={'space-between'}
        spacing={2}
        alignItems={'center'}
      >
        <Grid>
          <TextField
            select
            label="Filter by Status"
            name="user"
            fullWidth
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(Number(e.target.value));
            }}
            sx={{ width: 200 }}
          >
            {[
              { value: 0, label: <em>None</em> },
              { value: 1, label: 'Complete' },
              { value: 2, label: 'Incomplete' },
            ].map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid>
          <Button onClick={toggleAdd} variant="contained" startIcon={<Add />}>
            Add
          </Button>
        </Grid>
      </Grid>

      <TableContainer
        component={Paper}
        sx={{
          mt: 2,
          maxHeight: 600,
          td: {
            padding: '10px',
          },
        }}
      >
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Assignee</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredList && filteredList.length > 0 ? (
              filteredList?.map((row) => (
                <TableRow key={row.id} id={`row-${row.id}`}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell sx={{ width: 500 }}>{row.description}</TableCell>
                  <TableCell>
                    {row.assigneeId ? userMaps?.[row.assigneeId] : ''}
                  </TableCell>
                  <TableCell>
                    {row.completed ? (
                      <Chip
                        label="Complete"
                        color="primary"
                        variant="outlined"
                        sx={{ minWidth: 100 }}
                      />
                    ) : (
                      <Chip
                        label="Incomplete"
                        color="warning"
                        variant="outlined"
                        sx={{ minWidth: 100 }}
                      />
                    )}
                  </TableCell>
                  <TableCell sx={{ width: 100 }}>
                    <MenuAction
                      items={[
                        {
                          name: 'Detail',
                          onClick: () => navigate(`/${row.id}`),
                        },
                        {
                          name: row.completed
                            ? 'Mark as Incomplete'
                            : 'Mark as Complete',
                          onClick: () => handleComplete(row.id, row.completed),
                        },
                        {
                          name: 'Assign',
                          onClick: () => handleOpenAssign(row),
                        },
                        {
                          name: 'Unassign',
                          onClick: () => mutateUnassign(row.id),
                          disabled: row.assigneeId === null,
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                  {filteredList?.length === 0 ? 'No Record' : ''}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogAdd open={openAdd} toggle={toggleAdd} onSubmit={handleAddTicket} />
      <DialogAssign
        open={openAssign}
        toggle={toggleAssign}
        onSubmit={handleSubmitAssign}
        options={users}
        selectedRow={selectedRow}
      />
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
        onClick={(e) => e.preventDefault()}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Tickets;
