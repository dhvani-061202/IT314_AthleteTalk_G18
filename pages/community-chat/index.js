import { Grid } from '@mui/material';

const CommunityChat = () => {
  return (
    <>
      <Grid sx={{ height: '100%' }} container>
        <Grid item xs={3}>
          My Chats
        </Grid>
        <Grid item xs={9}>
          Chat Box
        </Grid>
      </Grid>
    </>
  );
};

export default CommunityChat;
