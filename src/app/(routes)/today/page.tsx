'use client';

import Box from '@mui/joy/Box';
import useZustandStore from '@/app/lib/zustand/useZustandStore';
import Header from '@/app/components/PageHeader';
import TodaySection from './TodaySection';
import OverdueSection from '@/app/components/OverdueSection';
import { useQuery } from '@apollo/client';
import { GET_TASKS } from '@/app/lib/apolloClient';
import useAuthCheck from '@/app/hooks/useAuthCheck';
import { normalizeAllTasks } from '@/app/utils/utils';

const TodayPage = () => {
  useAuthCheck();

  const { data, loading, error } = useQuery(GET_TASKS);
  const exractedData = data?.getTasks;
  const { todayData, overdueData } = normalizeAllTasks(exractedData);

  const { setIsAddTaskOpen } = useZustandStore();

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
        textAlign: 'center',
      }}
    >
      <Header count={todayData?.length} header="Today" hasCount={true} />
      <OverdueSection data={overdueData} />
      <TodaySection data={todayData} setIsAddTaskOpen={setIsAddTaskOpen} />
    </Box>
  );
};

export default TodayPage;
