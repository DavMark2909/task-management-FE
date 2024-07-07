import { useState } from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

function MyDatePicker(){

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    return (
        <div>
            <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="MM/dd/YYYY"/>
        </div>
    )

}

export default MyDatePicker;