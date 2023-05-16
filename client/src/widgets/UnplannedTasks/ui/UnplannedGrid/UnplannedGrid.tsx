import { Grid } from '@mui/material';
import { getTasks } from 'entities/Task';
import { getDistributeTaskIds } from 'features/DistributeTask/model/selectors/getDistributeTask';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { UnplannedTask } from '../UnplannedTask/UnplannedTask';


interface UnplannedGridProps {
}

export const UnplannedGrid: FC<UnplannedGridProps> = () => {
  const tasks = useSelector(getTasks);
  const checkedArray = useSelector(getDistributeTaskIds);

  return (
        <Grid flexWrap='wrap' justifyContent='space-between' display='flex' rowGap={2}>
      {
        tasks.map(item => (
          <UnplannedTask
            task={item}
            checked={checkedArray.some(id => id === item['_id'])}
          />
        ))
      }
    </Grid>
  );
}