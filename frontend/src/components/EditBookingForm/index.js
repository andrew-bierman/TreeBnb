import { useEffect, useState } from 'react';
import { getSpotBookings, editBooking, getAllUserBookings } from '../../store/bookings';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { addDays, isBefore, isAfter, differenceInDays, isWithinInterval, eachDayOfInterval, isSameDay } from 'date-fns';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker, DateRange } from 'react-date-range';

const EditBookingForm = ({ spotId, bookingId }) => {
    const dispatch = useDispatch();

    // const spotId = useSelector(state => state.spots.singleSpot.id)

    // const { spotId, bookingId } = useParams()

    const user = useSelector(state => state.session.user)
    const userBookings = useSelector(state => state.bookings.user)


    // const preSelectedStartDate = selectedDates.length > 0 ? new Date(selectedDates[0]) : (userBookings[bookingId]?.startDate !== undefined ? new Date(userBookings[bookingId].startDate) : new Date());
    // const preSelectedEndDate = selectedDates.length > 1 ? new Date(selectedDates[1]) : (userBookings[bookingId]?.endDate !== undefined ? new Date(userBookings[bookingId].endDate) : addDays(new Date(), 3));

    // console.log('preSelectedStartDate', preSelectedStartDate)
    // console.log('preSelectedEndDate', preSelectedEndDate)
    // console.log('userBooking[bookingId].startDate', userBookings[bookingId]?.startDate)

    const [selectedDates, setSelectedDates] = useState([]);

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


    const [calendarKey, setCalendarKey] = useState(0);

    const [disabledDates, setDisabledDates] = useState([]);
    const [isSelectionValid, setIsSelectionValid] = useState(false);
    const minDays = 1;

    const [showResponse, setShowResponse] = useState(false);
    const [successFullyCreated, setSuccessFullyCreated] = useState(false);


    useEffect(() => {
        const fetchData = async () => {

            if (spotId === undefined) return;

            await dispatch(getAllUserBookings())
                .then(res => {
                })
                .catch(err => console.log(err));

            await dispatch(getSpotBookings(spotId))
                .then(res => {
                    const bookings = res.Bookings;
                    const tempDisabled = extractDisabledDates(bookings);
                    setDisabledDates(tempDisabled);
                })
                .catch(err => console.log(err));
        }

        fetchData();

    }, [spotId, bookingId]);




    useEffect(() => {
        if (dateRange.selection.startDate && dateRange.selection.endDate) {
            const dateDiff = differenceInDays(
                dateRange.selection.endDate,
                dateRange.selection.startDate
            );
            setIsSelectionValid(dateDiff >= minDays);
            checkSelectionValidity();
        } else {
            setIsSelectionValid(false);
        }

        console.log('dateRange', dateRange)
    }, [spotId, dateRange]);

    useEffect(() => {
        const booking = userBookings[bookingId];
        if (booking) {
            const preSelectedStartDate = new Date(booking.startDate);
            const preSelectedEndDate = new Date(booking.endDate);
            // Adjust the dates to the same timezone as the API
            const utcOffset = preSelectedStartDate.getTimezoneOffset();
            preSelectedStartDate.setMinutes(preSelectedStartDate.getMinutes() + utcOffset);
            preSelectedEndDate.setMinutes(preSelectedEndDate.getMinutes() + utcOffset);
            setSelectedDates([preSelectedStartDate, preSelectedEndDate]);
            setDateRange({
                selection: {
                    startDate: preSelectedStartDate,
                    endDate: preSelectedEndDate,
                    key: 'selection',
                },
            });
        }
    }, [userBookings, bookingId]);



    const isDayDisabled = day => {
        return disabledDates.some(range => {
            return isBefore(day, range.endDate) && isAfter(day, range.startDate);
        });
    };


    const convertToAPIFormat = dateRange => {
        const startDate = dateRange.selection.startDate.toISOString().split('T')[0];
        const endDate = dateRange.selection.endDate.toISOString().split('T')[0];

        return {
            startDate,
            endDate
        };
    }

    const checkSelectionValidity = () => {

        if (dateRange.selection.startDate && dateRange.selection.endDate) {
            const startDate = new Date(dateRange.selection.startDate);
            const endDate = new Date(dateRange.selection.endDate);
            const diffInMs = endDate - startDate;
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

            const isDateDisabled = disabledDates.some(range => {
                const rangeStart = new Date(range.getFullYear(), range.getMonth(), range.getDate());
                const rangeEnd = addDays(rangeStart, 1);
                return isBefore(startDate, rangeEnd) && isAfter(endDate, rangeStart);
            });

            if (!isDateDisabled) {
                setIsSelectionValid(diffInDays >= minDays);
            } else {
                setIsSelectionValid(false);
            }
        }

    };

    const extractDisabledDates = bookings => {
        const tempDisabled = [];
        bookings.forEach(booking => {
            if (booking.startDate !== null && booking.endDate !== null) {
                const start = new Date(booking.startDate);
                const end = new Date(booking.endDate);

                // Adjust the dates to the same timezone as the API
                const utcOffset = start.getTimezoneOffset();
                start.setMinutes(start.getMinutes() + utcOffset);
                end.setMinutes(end.getMinutes() + utcOffset);

                // Compare the adjusted dates with the selected dates
                const startSameAsSelected = selectedDates[0] && isSameDay(start, new Date(selectedDates[0]));
                const endSameAsSelected = selectedDates[1] && isSameDay(end, new Date(selectedDates[1]));
                console.log('selectedDates[0]', selectedDates[0])
                console.log('selectedDates[1]', selectedDates[1])
                console.log('start', start)
                console.log('end', end)
                if (startSameAsSelected && endSameAsSelected) {
                    return;
                }

                tempDisabled.push(start, end);

                const diffInDays = differenceInDays(end, start);

                for (let i = 0; i < diffInDays; i++) {
                    const date = new Date(start);
                    date.setDate(date.getDate() + i);
                    date.setMinutes(date.getMinutes() + utcOffset);
                    tempDisabled.push(date);
                }
            }
        });
        return tempDisabled;
    };





    const validateDateRange = (start, end, disabledDates, minDays) => {
        // // Compare the adjusted dates with the selected dates
        // const startSameAsSelected = selectedDates[0] && isSameDay(start, new Date(selectedDates[0]));
        // const endSameAsSelected = selectedDates[1] && isSameDay(end, new Date(selectedDates[1]));

        // if (startSameAsSelected && endSameAsSelected) {
        //     return;
        // }

        const diffInMs = end - start;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        if (diffInDays < minDays) {
            return 'Booking must be at least 1 day long';
        }

        if (disabledDates.includes(start) || disabledDates.includes(end)) {
            return 'This date range is not available';
        }

        const isDateDisabled = disabledDates.some(range => {
            const rangeStart = new Date(range.getFullYear(), range.getMonth(), range.getDate());
            const rangeEnd = addDays(rangeStart, 1);
            return isBefore(start, rangeEnd) && isAfter(end, rangeStart);
        });

        if (isDateDisabled) {
            return 'This date range is not available';
        }

        return null;
    };


    const handleSubmit = async () => {
        const apiDates = convertToAPIFormat(dateRange);

        const startDate = apiDates.startDate;
        const endDate = apiDates.endDate;
        const minDays = 1; // Minimum booking length

        const start = new Date(startDate);
        const end = new Date(endDate);

        const validationError = validateDateRange(start, end, disabledDates, minDays);

        if (validationError) {
            alert(validationError);
            return;
        }

        const bookingData = {
            startDate,
            endDate,
            spotId,
            bookingId
        };

        const res = await dispatch(editBooking(bookingData));

        if (res.id !== undefined || res.id !== null) {
            setShowResponse(true);
            setSuccessFullyCreated(true);
        } else if (res.ok === false) {
            setShowResponse(true);
            setSuccessFullyCreated(false);
        }

        console.log('res!', res);
    };



    return (
        <div className='create-booking-component' key={calendarKey}>
            <DateRange
                minDate={new Date()}
                maxDate={addDays(new Date(), 365)}

                direction="vertical"

                scroll={{ enabled: false }}

                editableDateInputs={true}


                ranges={[dateRange.selection]}
                onChange={dateRange => setDateRange(dateRange)}

                disabledDates={disabledDates}

                isDayDisabled={isDayDisabled}

                // ranges={[{ startDate: new Date(), endDate: new Date(2022, 0, 1) }]}

                months={1}

                moveRangeOnFirstSelection={false}

                // endDatePlaceholder="Continuo"
                rangeColors={['#70C1B3', '#3ecf8e', '#fed14c']}
            />

            <div className='create-booking-reserve-button container'>
                <div className='buttons is-centered is-flex-wrap-wrap is-clipped'>
                    {
                        showResponse ?
                            <div className='tags is-centered'>
                                {
                                    successFullyCreated ?
                                        <div className="tag is-success is-small has-text-centered">
                                            Your booking has been successfully updated!
                                            <button className="delete is-small" onClick={() => setShowResponse(false)}></button>

                                        </div>
                                        :
                                        <div className="tag is-danger is-inline-block">
                                            <button className="delete" onClick={() => setShowResponse(false)}></button>
                                            There was an error updating your booking. Please try again.
                                        </div>

                                }
                            </div>
                            :
                            <>
                                <button className="button is-light" disabled={!isSelectionValid} onClick={e => handleSubmit()}>Reserve</button>
                                {!isSelectionValid && (
                                    // <p className="help is-danger"></p>
                                    <div className="tag is-danger">
                                        {/* <button className="delete" onClick={() => setShowResponse(false)}></button> */}
                                        Please select at least two days
                                    </div>

                                )}
                            </>

                    }
                </div>
            </div>

        </div>
    );
};

export default EditBookingForm;
