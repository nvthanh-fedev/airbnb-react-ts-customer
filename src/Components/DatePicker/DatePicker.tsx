import React from "react";
import { Moment } from "moment";
import "moment/locale/vi"; // Import ngôn ngữ tiếng Việt
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DayPickerRangeController, FocusedInputShape } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./react_dates_overrides.css"; // Import file CSS ghi đè
import { AppDispatch, RootState } from "../../Redux/configStore";
import {
  setDaysBetweenDates,
  setEndDay,
  setStartDay,
  setTitleBooking,
} from "../../Redux/reducers/uiManagementReducer";
import { daysBetweenDates } from "../../Global/Method";
import moment from "moment";

const HORIZONTAL_ORIENTATION = "horizontal";
const VERTICAL_ORIENTATION = "vertical";

type Props = {};

const DatePicker: React.FC<Props> = () => {
  const dispatch: AppDispatch = useDispatch();

  const [dates, setDates] = useState<{
    startDate: Moment | null;
    endDate: Moment | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const defaultFocusedInput: FocusedInputShape | null = "startDate";
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    defaultFocusedInput
  );

  const { room } = useSelector(
    (state: RootState) => state.roomManagementReducer
  );

  const handleDatesChange = (dates: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    setDates(dates);
    const startDateStr = dates.startDate
      ? dates.startDate.format("DD-MM-YYYY")
      : "null";
    const endDateStr = dates.endDate
      ? dates.endDate.format("DD-MM-YYYY")
      : "null";

    dispatch(setStartDay(startDateStr));
    dispatch(setEndDay(endDateStr));

    if (dates.startDate && dates.endDate && room) {
      const days = daysBetweenDates(startDateStr, endDateStr);
      dispatch(setDaysBetweenDates(days));

      dispatch(setTitleBooking(`${days} đêm tại ${room?.tenPhong}`));
    } else if (dates.startDate && !dates.endDate && room) {
      dispatch(setTitleBooking(`Chọn ngày trả phòng`));
    } else {
      dispatch(setTitleBooking(`Chọn ngày nhận phòng`));
    }
  };

  const onFocusChange = (focusedInput: FocusedInputShape | null) => {
    setFocusedInput(focusedInput);
  };

  return (
    <DayPickerRangeController
      verticalHeight={760}
      isOutsideRange={(day) => day.isBefore(moment().startOf("day"))}
      startDate={dates.startDate}
      endDate={dates.endDate}
      onDatesChange={handleDatesChange}
      focusedInput={focusedInput || defaultFocusedInput}
      onFocusChange={onFocusChange}
      numberOfMonths={2}
      daySize={40}
      noBorder={true}
      hideKeyboardShortcutsPanel={true}
      orientation={
        window.innerWidth > 700 ? HORIZONTAL_ORIENTATION : VERTICAL_ORIENTATION
      }
    />
  );
};

export default DatePicker;
