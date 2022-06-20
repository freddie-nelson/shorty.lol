import { ChangeEventHandler, useState } from "react";

export default function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: ((event) => {
        setValue(event.target.value);
      }) as ChangeEventHandler<HTMLInputElement>,
    },
  };
}
