import clsx from "clsx";
import PropTypes from "prop-types";
import React, { cloneElement, forwardRef, useState } from "react";
import { CalendarIcon, DownArrowIcon } from "../..";
import { formatDate } from "../../helpers/date";
import { Input } from "../Forms/Input";
import { Popover } from "../Popover/Popover";
import { DatePicker } from "./DatePicker";

export const DatePickerPopover = ({
    value,
    variant = "single",
    dateFormat = "ddd, LL",
    onChange,
    children,
    classNames = {},
    components = {},
    popoverProps,
    getDayContent,
    defaultInputPlaceholder = "Select Date",
    ...rest
}) => {
    const [originalValue, setOriginalValue] = useState(value);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    const handleChange = (date, options, event) => {
        if (variant === "single") {
            onChange?.(date, options, event);
            toggleVisibility();
        } else {
            onChange?.(date, originalValue, options, event);
        }
    };

    const handleSubmitDateRange = () => {
        setOriginalValue(value);
        onChange?.(value);
        setIsVisible(false);
    };

    const handleClickOutside = () => {
        // Revert back to the original value because the user didn't apply the changes
        onChange(originalValue);
        toggleVisibility();
    };

    return (
        <Popover
            visible={isVisible}
            maxWidth={900}
            distance={18}
            placement="bottom"
            className={clsx("ui-date-picker-input", classNames.popover)}
            onClickOutside={handleClickOutside}
            {...popoverProps}
        >
            {children ? (
                cloneElement(children, { onClick: toggleVisibility })
            ) : (
                <DefaultInput
                    readOnly
                    size="medium"
                    value={value ? formatDate(value, dateFormat) : ""}
                    onClick={toggleVisibility}
                    placeholder={defaultInputPlaceholder}
                />
            )}

            <Popover.Content className="pr-1">
                <DatePicker
                    variant={variant}
                    getDayContent={getDayContent}
                    value={value}
                    components={components}
                    onChange={handleChange}
                    onSubmitDateRange={handleSubmitDateRange}
                    {...rest}
                />
            </Popover.Content>
        </Popover>
    );
};

DatePickerPopover.propTypes = {
    ...DatePicker.propTypes,
    dateFormat: PropTypes.string,
    classNames: PropTypes.object,
    popoverProps: PropTypes.object,
    children: PropTypes.node,
    defaultInputPlaceholder: PropTypes.string,
};

const DefaultInput = forwardRef(({ className, placeholder, onClick, ...rest }, reference) => {
    return (
        <div
            ref={reference}
            className="relative flex rounded border border-gray-light hover:border-black hover:bg-gray-lighter"
            onClick={onClick}
        >
            <div className="flex">
                <div className="pointer-events-none inset-0 flex items-center pl-3">
                    <CalendarIcon />
                </div>
                <Input
                    className={clsx("cursor-pointer border-none hover:bg-gray-lighter", className)}
                    placeholder={placeholder}
                    {...rest}
                />
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <DownArrowIcon className="inline-block" />
            </div>
        </div>
    );
});

DefaultInput.propTypes = {
    // eslint-disable-next-line react/require-default-props
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
};
