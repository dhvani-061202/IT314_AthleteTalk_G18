import AuthContext from '../../store/auth-context';
import { useRouter } from 'next/router';
import { Download } from '@mui/icons-material';

const BasicRadialChart = dynamic(
  () => import('../../components/BasicRadialChart'),
  { ssr: false }
);

const colors = [
  '#FF6633',
  '#FFB399',
  '#FF33FF',
  '#FFFF99',
  '#00B3E6',
  '#E6B333',
  '#3366E6',
  '#999966',
  '#99FF99',
  '#B34D4D',
  '#80B300',
  '#809900',
  '#E6B3B3',
  '#6680B3',
  '#66991A',
  '#FF99E6',
  '#CCFF1A',
  '#FF1A66',
  '#E6331A',
  '#33FFCC',
  '#66994D',
  '#B366CC',
];

const Dashboard = ({ plans, categories }) => {
  // console.log(plans);
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const completedPlans = plans.filter(
    (plan) => plan.progress === plan.plan.noOfDays
  );

  const inProgressPlans = plans.filter(
    (plan) => plan.progress !== plan.plan.noOfDays
  );

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: 2,
        }}
      >
        Welcome, {authContext.user.name}
      </Typography>
      <br></br>
      <Paper elevation={2}>
        <Typography variant="h5" p={2}>
          Plan Summary
        </Typography>
        {plans.length === 0 && (
          <Typography
            variant="h5"
            p={2}
            sx={{ display: 'flex', justifyContent: 'center', pt: 0 }}
          >
            No plans yet
          </Typography>
        )}
        {plans.length > 0 && (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <BasicRadialChart
                  completed={completedPlans.length}
                  total={plans.length}
                  message={'Plan Progression'}
                />
              </Grid>
              <Grid item xs={12} md={4} p={2}>
                <Typography variant="h5">In Progress</Typography>
                {inProgressPlans.map((plan) => (
                  <Box
                    key={plan._id}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {plan.plan.name}
                    </Typography>
                    <Typography variant="body1">
                      {plan.progress}/{plan.plan.noOfDays}
                    </Typography>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12} md={4} p={2}>
                <Typography variant="h5">Completed</Typography>
                {completedPlans.map((plan) => (
                  <Box
                    key={plan._id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                      {plan.plan.name}
                    </Typography>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="body1">
                        {plan.progress}/{plan.plan.noOfDays}
                      </Typography>
                      <a
                        key={plan._id}
                        href={`/api/achievement/${plan.plan._id}`}
                        target="_black"
                        style={{
                          color: 'black',
                          textDecoration: 'none',
                        }}
                      >
                        <Icon
                          component={Download}
                          sx={{ marginLeft: '20px' }}
                        />
                      </a>
                    </Box>
                  </Box>
                ))}
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
      <br></br>
      <Paper elevation={2}>
        <Typography variant="h5" p={2}>
          Preferred Category
        </Typography>
        {categories[0].preferredCategories.length === 0 && (
          <Typography
            variant="h5"
            p={2}
            sx={{ display: 'flex', justifyContent: 'center', pt: 0 }}
          >
            No preferred categories yet
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
          m={2}
          pb={2}
        >
          {categories[0].preferredCategories.map((category, idx) => (
            <Box
              key={category._id}
              sx={{
                display: 'grid',
              }}
              m={1}
            >
              <Typography
                variant="h6"
                p={2}
                sx={{
                  display: 'inline-grid',
                  fontWeight: 'bold',
                  height: '125px',
                  width: '275px',
                  bgcolor: colors[idx % colors.length],
                  fontSize: '25px',
                  borderRadius: '10px',
                }}
              >
                {category.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </>
  );
};
