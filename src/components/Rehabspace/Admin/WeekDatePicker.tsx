import { filterWeeklyData } from '@utils/rehabspcetable';
import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Week {
  start: Date | null;
  end: Date | null;
}

interface WeekDatePickerProps {
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const WeekDatePicker: React.FC<WeekDatePickerProps> = ({ setData }) => {
  const [selectedWeek, setSelectedWeek] = useState<Week>({
    start: null,
    end: null,
  });

  useEffect(() => {
    const getStartAndEndOfWeek = async () => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const diff = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1); 
      const startOfWeek = new Date(currentDate.setDate(diff));
      const endOfWeek = new Date(new Date().setDate(diff + 6));

      setSelectedWeek({ start: startOfWeek, end: endOfWeek });

      const result = await filterWeeklyData({ start: startOfWeek, end: endOfWeek });
      setData(result.result);
    };

    getStartAndEndOfWeek();
    
  }, []);

  const handlePrevClick = async () => {
    if (selectedWeek.start) {
      const newStartDate = new Date(selectedWeek.start);
      newStartDate.setDate(newStartDate.getDate() - 7);
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newEndDate.getDate() + 6);

      setSelectedWeek({ start: newStartDate, end: newEndDate });
      const result = await filterWeeklyData({ start: newStartDate, end: newEndDate });
      setData(result.result);
      console.log(result);
    }
  };

  const handleNextClick = async () => {
    const currentDate = selectedWeek.end || new Date(); // If no date selected, use the current date
    const newStartDate = new Date(currentDate);
    newStartDate.setDate(currentDate.getDate() + 1);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 6);

    setSelectedWeek({ start: newStartDate, end: newEndDate });
    const result = await filterWeeklyData({ start: newStartDate, end: newEndDate });
    setData(result.result);
    console.log(result);
  };

  return (
    <div className='flex gap-4 items-center  text-gray-600'>
      <button onClick={handlePrevClick}><FaAngleLeft size={20}/></button>
      <div>
        {selectedWeek.start && selectedWeek.end && (
          <>
            {selectedWeek.start.toDateString()}  -  {selectedWeek.end.toDateString()}
          </>
        )}
      </div>
      <button onClick={handleNextClick}><FaAngleRight  size={20}/></button>
    </div>
  );
};

export default WeekDatePicker;
