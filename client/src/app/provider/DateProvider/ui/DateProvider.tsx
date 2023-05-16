import { getScheduleInterval, getScheduleType } from 'entities/Shedule';
import { FC, ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getTasksByDate } from 'entities/Task';
import { useNavigate } from 'react-router-dom';

interface DateProviderProps {
  children: ReactNode;
}

export const DateProvider: FC<DateProviderProps> = ({children}) => {
  const scheduleType = useSelector(getScheduleType);
  const scheduleDateInterval = useSelector(getScheduleInterval);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${scheduleType}`);
  }, [scheduleType]);

  useEffect(() => {
    if(!scheduleDateInterval.from || !scheduleDateInterval.to) return;
    dispatch(getTasksByDate(scheduleDateInterval));
  }, [scheduleDateInterval]);

  return (
    <>
      {children}
    </>
  );
}