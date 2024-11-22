import { TimePicker, Select } from "antd";
import dayjs from "dayjs";
const TimePickerInput = ({ onTimeRangeChange, value }) => (
  <div>
    <label className="text-gray-800 text-sm mb-2 block">
      Available Time Slots
    </label>
    <TimePicker.RangePicker
      onChange={onTimeRangeChange}
      value={
        value.length === 2
          ? [dayjs(value[0], "HH-mm"), dayjs(value[1], "HH-mm")]
          : null
      }
      format="HH-mm"
    />
  </div>
);
export default TimePickerInput;
