import { useState, useMemo } from "react";
import get from "lodash/get";
import toLower from "lodash/toLower";
import {
  faCheck,
  faCaretDown,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { DivAsInput } from "@deskpro/deskpro-ui";
import { Dropdown } from "@deskpro/app-sdk";
import type { ReactNode } from "react";
import type {
  AnyIcon,
  LabelProps,
  DropdownItemType,
  DivAsInputWithDisplayProps,
} from "@deskpro/deskpro-ui";
import type { DropdownTargetProps, DropdownProps } from "@deskpro/app-sdk";
import type { Option, Maybe } from "../../../types";
import size from "lodash/size";

type Props<T> = Pick<DropdownProps<T, HTMLElement>, "closeOnSelect"|"containerHeight"|"containerMaxHeight"|"placement"> & {
  id: string,
  error?: DivAsInputWithDisplayProps["error"],
  value: Maybe<T | T[]>,
  options: Option<T>[],
  onChange: (o: Option<T>) => void,
  placeholder?: DivAsInputWithDisplayProps["placeholder"],
  showInternalSearch?: boolean,
  required?: LabelProps["required"],
  noFoundText?: string,
};

const Select = <T,>({
  id,
  error,
  value,
  options,
  onChange,
  required,
  noFoundText,
  placeholder,
  showInternalSearch,
  ...props
}: Props<T>) => {
  const [input, setInput] = useState<string>("");

  const displayValue = useMemo(() => {
    if (Array.isArray(value)) {
      return options
        .filter((o) => value.includes(o.value))
        .map((o) => o.label)
        .join(", ");
    } else {
      const o = options.find((o) => o.value === value);
      return get(o, ["label"], value);
    }
  }, [value, options]) as ReactNode;

  const currentOptions = useMemo(() => {
    if (!size(options)) {
      return [{ type: "header", label: noFoundText || "No items(s) found" }];
    }

    return options
      .filter((o) =>
        toLower(get(o, ["label"], "") as string).includes(input.toLowerCase())
      )
      .map((o) => ({
        ...o,
        selected: Array.isArray(value)
          ? value.includes(o.value)
          : o.value === value,
      }));
  }, [options, value, input, noFoundText]) as Array<DropdownItemType<T>>;

  return (
    <Dropdown
      showInternalSearch={showInternalSearch}
      fetchMoreText={"Fetch more"}
      autoscrollText={"Autoscroll"}
      selectedIcon={faCheck as AnyIcon}
      externalLinkIcon={faExternalLinkAlt as AnyIcon}
      placement="bottom-start"
      hideIcons
      inputValue={input}
      onSelectOption={(selectedOption) => {
        setInput("");
        onChange(selectedOption);
      }}
      onInputChange={(value) => {
        if (showInternalSearch) {
          setInput(value);
        }
      }}
      options={currentOptions}
      {...props}
    >
      {({ targetRef, targetProps }: DropdownTargetProps<HTMLDivElement>) => (
        <DivAsInput
          id={id}
          placeholder={placeholder || "Select Value"}
          variant="inline"
          rightIcon={faCaretDown as AnyIcon}
          error={error}
          ref={targetRef}
          {...targetProps}
          value={displayValue}
          style={{ paddingRight: 0, cursor: "pointer" }}
        />
      )}
    </Dropdown>
  );
};

export { Select };
