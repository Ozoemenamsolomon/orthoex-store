import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

interface CustomDatePickerProps {
  onChange: (date: string) => void; 
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ onChange }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | null) => {
        setStartDate(date);
        if (date) {
            onChange(date.toISOString());
        }
    };

    return (
        <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            className="bg-gray-50 p-2 rounded border"
        />
    );
};

export default CustomDatePicker;
