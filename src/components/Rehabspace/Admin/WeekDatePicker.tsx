import { filterWeeklyData } from '@utils/rehabspcetable';
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

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
    // Function to get the start and end dates of the current week
    const getStartAndEndOfWeek = (): Week => {
      const currentDate = new Date();
      const currentDay = currentDate.getDay();
      const diff = currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust to Monday if the current day is Sunday
      const startOfWeek = new Date(currentDate.setDate(diff));
      const endOfWeek = new Date(new Date().setDate(diff + 6));
      return { start: startOfWeek, end: endOfWeek };
    };

    // Set the initial state with the current week
    setSelectedWeek(getStartAndEndOfWeek());
  }, []);

  const handlePrevClick = async () => {
    if (selectedWeek.start) {
      const newStartDate = new Date(selectedWeek.start);
      newStartDate.setDate(newStartDate.getDate() - 7);
      const newEndDate = new Date(newStartDate);
      newEndDate.setDate(newEndDate.getDate() + 6);

      setSelectedWeek({ start: newStartDate, end: newEndDate });
      const result = await filterWeeklyData({ start: newStartDate, end: newEndDate });
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
    <div className='flex gap-4 items-center '>
      <button onClick={handlePrevClick}><FaArrowLeft/></button>
      <div>
        {selectedWeek.start && selectedWeek.end && (
          <p>
            Week: {selectedWeek.start.toDateString()} - {selectedWeek.end.toDateString()}
          </p>
        )}
      </div>
      <button onClick={handleNextClick}><FaArrowRight/></button>
    </div>
  );
};

export default WeekDatePicker;
