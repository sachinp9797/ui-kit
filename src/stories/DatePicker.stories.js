import dayjs from "dayjs";
import _ from "lodash";
import React, { useState } from "react";
import { DatePicker, DatePickerInput } from "..";
import twConfig from "../../tailwind.config";

const DatePickerStories = {
    title: "Data Display/Date & Time/Date Picker",
    component: DatePicker,
    parameters: {
        docs: {
            source: {
                type: "code",
            },
            description: {
                component:
                    "Rendering a date picker with various functionality based on [React Day Picker](https://react-day-picker.js.org) library",
            },
        },
    },
};

const today = new Date(new Date().getFullYear(), new Date().getMonth());
const Colors = twConfig.theme.colors;

export const Default = () => {
    return <DatePicker selectedDays={new Date()} />;
};

export const DisabledDays = () => {
    const disabledDays = [
        // Disable two specific dates
        new Date(today.setDate(14)),
        new Date(today.setDate(2)),
        {
            // All days between these two dates
            after: new Date(today.setDate(18)),
            before: new Date(today.setDate(25)),
        },
        {
            // Disabled all Sundays
            daysOfWeek: [0],
        },
    ];

    return <DatePicker month={today} disabledDays={disabledDays} />;
};

addDescription(
    DisabledDays,
    'Use the `disabledDays` prop to display days with a "disabled" style. You can match a wide range of days by passing one or more [different modifiers](http://react-day-picker.js.org/docs/matching-days) to disabledDays',
);

export const RestrictNavigation = () => {
    return <DatePicker month={today} fromMonth={today} toMonth={dayjs().add(2, "month").toDate()} />;
};

addDescription(
    RestrictNavigation,
    "Use the `fromMonth` and `toMonth` props to restrict the navigation between months.",
);

export const ModifyCellStyle = () => {
    const modifiers = {
        thursdays: { daysOfWeek: [4] },
        waitlist: [new Date(today.setDate(18)), new Date(today.setDate(20))],
    };

    const modifiersStyles = {
        thursdays: {
            color: Colors.white,
            backgroundColor: Colors.blue.light,
            borderRadius: 0,
        },
        waitlist: {
            color: Colors.white,
            backgroundColor: Colors.yellow.DEFAULT,
        },
        outside: {
            backgroundColor: Colors.white,
        },
    };

    return <DatePicker month={today} modifiers={modifiers} modifiersStyles={modifiersStyles} fromMonth={new Date()} />;
};

addDescription(
    ModifyCellStyle,
    "You can apply a custom inline style to day cells using [modifiers](https://react-day-picker.js.org/docs/matching-days). For example you can style certain cells in the Waitlist yellow.",
);

export const SelectYearMonth = () => {
    return <DatePicker shouldShowYearPicker month={new Date(2021, 3, 21)} />;
};

addDescription(
    SelectYearMonth,
    "This example shows how to use the `month` and `shouldShowYearPicker` prop to change the calendar's caption. For example, we can use these props to start in the month of April and to add a form to switch between months and years.",
);

export const AddContentToDays = () => {
    const customContent = [null, "$10", "Sold Out!"];
    for (let day = 2; day <= dayjs().daysInMonth(); day++) {
        customContent.push("$" + _.random(1, 200));
    }

    return <DatePicker customContent={customContent} />;
};

addDescription(
    AddContentToDays,
    "**WIP:** Add custom content to any day cell for example the maximum price for a specific date",
);

export const PickerWithInput = () => {
    return (
        <div className="h-[350px]">
            <DatePickerInput />
        </div>
    );
};

addDescription(
    PickerWithInput,
    "The `DatePickerInput` component binds the DatePicker with an input field, displaying the calendar in an overlay",
);

export const EventHandlers = () => {
    const [month, setMonth] = useState(dayjs().format("MMMM YYYY"));
    const [date, setDate] = useState(dayjs().format("ddd, DD MMMM YYYY"));

    const onMonthChange = (newMonth) => {
        setMonth(dayjs(newMonth).format("MMMM YYYY"));
    };

    const onDayClick = (today) => {
        setDate(dayjs(today).format("ddd, DD MMMM YYYY"));
    };

    return (
        <>
            <div>
                Selected Date <code className="p-1 mr-1 text-sm bg-gray-lighter">onDayClick</code>
                <span className="inline-block pb-3 font-semibold">{date}</span>
            </div>
            <div>
                Current Month <code className="p-1 mr-1 text-sm bg-gray-lighter">onMonthChange</code>
                <span className="inline-block pb-3 font-semibold">{month}</span>
            </div>
            <DatePicker onMonthChange={onMonthChange} onDayClick={onDayClick} />
        </>
    );
};

addDescription(
    EventHandlers,
    "This shows various useful [event handlers](https://react-day-picker.js.org/api/DayPicker#onBlur) with `DatePicker` ",
);

function addDescription(component, description) {
    component.parameters = {
        docs: {
            description: {
                story: description,
            },
        },
    };
}

export default DatePickerStories;