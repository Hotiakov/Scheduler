import { Box } from '@mui/system';
import { getUnplannedTasks } from 'entities/Task/model/services/getUnplannedTask';
import { DistributeBtn } from 'features/DistributeTask';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { UnplannedGrid } from 'widgets/UnplannedTasks';

export const  UnplannedPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUnplannedTasks());
  }, []);

  return (
    <Box display='flex' sx={{
      flexDirection: 'column',
      gap: 2,
      padding: 2
    }}>
      <DistributeBtn />
      <UnplannedGrid />
    </Box>
  );
}