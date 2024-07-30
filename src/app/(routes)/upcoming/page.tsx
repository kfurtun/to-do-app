'use client';

import OverdueSection from '@/app/components/OverdueSection';
import Header from '@/app/components/PageHeader/';
import { GET_TASKS } from '@/app/lib/apolloClient';
import { normalizeAllTasks } from '@/app/utils/utils';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/joy';

const Upcoming = () => {
  const { data, loading, error } = useQuery(GET_TASKS);
  const exractedData = data?.getTasks;
  const { todayData, overdueData } = normalizeAllTasks(exractedData);
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Header header="Upcoming" hasCount={false} />
      <OverdueSection data={overdueData} />
    </Box>
  );
};

export default Upcoming;
