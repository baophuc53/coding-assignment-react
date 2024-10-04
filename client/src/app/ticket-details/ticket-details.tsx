import { NavLink, useParams } from 'react-router-dom';
import { useGetTicketById, useGetUserById } from './hooks';
import styles from './ticket-details.module.css';
import {
  Backdrop,
  CircularProgress,
  Grid2 as Grid,
  Link,
  styled,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useMemo } from 'react';

/* eslint-disable-next-line */
export interface TicketDetailsProps {}

export function TicketDetails(props: TicketDetailsProps) {
  const { id } = useParams();
  const ticketId = Number(id);
  const { data: ticket, isFetching: isLoadingTicket } =
    useGetTicketById(ticketId);
  const { data: user, isFetching: isLoadingUser } = useGetUserById(
    ticket?.assigneeId
  );

  const statusName = useMemo(() => {
    if (ticket?.completed === true) return 'Complete';
    if (ticket?.completed === false) return 'Incomplete';
    return '';
  }, [ticket?.completed]);

  const isLoading = useMemo(() => {
    return isLoadingTicket || isLoadingUser;
  }, [isLoadingTicket, isLoadingUser]);

  return (
    <div className={styles['container']}>
      <h2>Ticket detail</h2>
      <Grid container spacing={2} size={12}>
        <Grid size={12}>
          <StyledTextField fullWidth label="ID" value={ticket?.id ?? ''} />
        </Grid>
        <Grid size={12}>
          <StyledTextField
            fullWidth
            label="Description"
            value={ticket?.description ?? ''}
          />
        </Grid>
        <Grid size={12}>
          <StyledTextField
            fullWidth
            label="Assignee"
            value={user?.name ?? ''}
          />
        </Grid>
        <Grid size={12}>
          <StyledTextField fullWidth label="Status" value={statusName} />
        </Grid>
        <Grid size={12}>
          <Link component={NavLink} to={'/'}>
            Back to list
          </Link>
        </Grid>
      </Grid>
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

const StyledTextField = styled((props: TextFieldProps) => (
  <TextField
    {...props}
    slotProps={{
      input: {
        readOnly: true,
      },
    }}
  />
))({
  maxWidth: 500,
});

export default TicketDetails;
