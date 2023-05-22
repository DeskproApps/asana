import { default as fnsFormat } from "date-fns/format";
import { DATE_FORMAT } from "../../constants";
import type { Maybe, DateOn, DateAt } from "../../types";

const format = (date: Maybe<DateOn|DateAt>, pattern = DATE_FORMAT): string => {
    if (!date) {
        return "-";
    }

    return fnsFormat(new Date(date), pattern);
};

export { format };
