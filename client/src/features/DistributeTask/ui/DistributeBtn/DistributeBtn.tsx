import { Button } from '@mui/material';
import { FC } from 'react';
import { distributeTask } from 'features/DistributeTask/model/services/distributeTask';
import { useSelector } from 'react-redux';
import { getDistributeTaskIds } from 'features/DistributeTask/model/selectors/getDistributeTask';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';


export const  DistributeBtn: FC = () => {
  const distributeTaskIds = useSelector(getDistributeTaskIds);
  const dispath = useAppDispatch();

  const distributeHandle = () => {
    dispath(distributeTask(distributeTaskIds));
  }

  return (
      <Button variant='outlined' onClick={distributeHandle} disabled={!distributeTaskIds.length}>
        Распределить задачи: {distributeTaskIds.length}
      </Button>
  );
}