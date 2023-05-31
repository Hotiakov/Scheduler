import { Box } from '@mui/system';
import { getUnplannedTasks } from 'entities/Task/model/services/getUnplannedTask';
import { DistributeBtn } from 'features/DistributeTask';
import { getDistributeTaskLoading } from 'features/DistributeTask/model/selectors/getDistributeTask';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { Loader } from 'shared/ui/Loader/Loader';
import { UnplannedGrid } from 'widgets/UnplannedTasks';

export const  UnplannedPage: FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getDistributeTaskLoading);
  
  useEffect(() => {
    dispatch(getUnplannedTasks());
  }, []);


  return (
    <>
      <Box display='flex' sx={{
        flexDirection: 'column',
        gap: 2,
        padding: 2
      }}>
        <DistributeBtn />
        <UnplannedGrid />
      </Box>
      {isLoading && <Loader />}
    </>
  );
}