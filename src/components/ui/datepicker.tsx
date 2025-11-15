"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { clearTime } from "@/lib/clearTime";
import { copyTime } from "@/lib/copyTime";
import { useBoolean } from "@/lib/hooks/useBoolean";

interface Props {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
}

export const Calendar24: React.FC<Props> = (props) => {
  const { date } = props;
  const open = useBoolean();
  const datePickerId = React.useId();
  const timePickerId = React.useId();

  const timeValue =
    date &&
    [date.getHours(), date.getMinutes(), date.getSeconds()]
      .map((value) => value.toString().padStart(2, "0"))
      .join(":");

  const onDateChange = (newDate?: Date) => {
    if (!newDate) {
      props.onDateChange?.(undefined);
      return;
    }

    if (date) {
      props.onDateChange?.(copyTime(date, newDate));
    } else {
      props.onDateChange?.(newDate);
    }
  };

  const onTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const onDateChange = props.onDateChange;
    if (!date || !onDateChange) {
      return;
    }

    const value = e.target.value;
    const [hours, minutes, seconds] = value.split(":").map((value) => {
      const time = parseInt(value, 10);

      if (Number.isNaN(time) || time < 0) {
        return undefined;
      }

      return time;
    });

    const result = clearTime(date);

    if (hours !== undefined) {
      result.setHours(hours);
    }
    if (minutes !== undefined) {
      result.setMinutes(minutes);
    }

    if (seconds !== undefined) {
      result.setSeconds(seconds);
    }

    onDateChange(result);
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor={datePickerId} className="px-1">
          Дата
        </Label>
        <Popover open={open.state} onOpenChange={open.setState}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id={datePickerId}
              className="w-32 justify-between font-normal"
            >
              {date ? date.toLocaleDateString() : "Оберіть дату"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                onDateChange(date);
                open.setFalse();
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor={timePickerId} className="px-1">
          Час
        </Label>
        <Input
          value={timeValue || ""}
          disabled={!date}
          onChange={onTimeChange}
          type="time"
          lang="uk"
          id={timePickerId}
          step="1"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
};
