import * as React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./Select"

interface TimePickerProps {
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"))

  const [selectedHour, setSelectedHour] = React.useState(value?.split(":")[0] || "00")
  const [selectedMinute, setSelectedMinute] = React.useState(value?.split(":")[1] || "00")

  React.useEffect(() => {
    if (onChange) {
      onChange(`${selectedHour}:${selectedMinute}`)
    }
  }, [selectedHour, selectedMinute, onChange])

  return (
    <div className={className}>
      <div className="flex gap-2">
        <Select value={selectedHour} onValueChange={setSelectedHour}>
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Hora" />
          </SelectTrigger>
          <SelectContent>
            {hours.map((hour) => (
              <SelectItem key={hour} value={hour}>
                {hour}h
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedMinute} onValueChange={setSelectedMinute}>
          <SelectTrigger className="w-[110px]">
            <SelectValue placeholder="Minuto" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((minute) => (
              <SelectItem key={minute} value={minute}>
                {minute}min
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
} 