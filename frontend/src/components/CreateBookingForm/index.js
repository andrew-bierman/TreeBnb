import { useEffect, useState } from 'react';
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker, DateRange } from 'react-date-range';

const CreateBookingForm = () => {
  const [dateRange, setDateRange] = useState({
    selection: {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'selection'
    },
    compare: {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: 'compare'
    }
  });


  const [disabledDates, setDisabledDates] = useState([
    // Add your array of disabled dates here
  ]);

  const convertToAPIFormat = dateRange => {
    const startDate = dateRange.selection.startDate.toISOString().split('T')[0];
    const endDate = dateRange.selection.endDate.toISOString().split('T')[0];

    return {
      startDate,
      endDate
    };
  }

  const handleSubmit = (spotId) => {
    const apiDates = convertToAPIFormat(dateRange)

    console.log(apiDates)
  }


  useEffect(() => {
    // console.log(dateRange)
    // console.log(convertToAPIFormat(dateRange));
  }, [dateRange]);

  return (
    <div className='create-booking-component'>
      <DateRange
        disabledDates={disabledDates}

        onChange={dateRange => setDateRange(dateRange)}
        // ranges={[{ startDate: new Date(), endDate: new Date(2022, 0, 1) }]}

        months={1}
        minDate={new Date()}
        maxDate={addDays(new Date(), 365)}

        direction="vertical"
        scroll={{ enabled: false }}
        editableDateInputs={true}

        ranges={[dateRange.selection]}


        moveRangeOnFirstSelection={false}

        // endDatePlaceholder="Continuo"
        rangeColors={['#70C1B3', '#3ecf8e', '#fed14c']}
      />

      <div className='create-booking-reserve-button'>
        <button className="button is-light" onClick={e => handleSubmit()}>Reserve</button>
      </div>

    </div>
  );
};

export default CreateBookingForm;
