import { Icon } from "@chakra-ui/react";
import { CheckCircle, Prohibit } from "@phosphor-icons/react";

export function EMValue(value) {
  return ((value * -1) / 1000).toFixed(2);
}

export function makeNegativeNumberZero(num) {
  return Math.max(0, num) || 0;
}

export function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function getInternalValue({ allOptions, isMulti, value }) {
  if (isMulti) {
    if (!value) {
      return null;
    }
    return value
      .map((optionValue) =>
        allOptions.find((option) => option.value === optionValue)
      )
      .reduce((valueItems, valueItem) => {
        if (!valueItem) {
          return valueItems;
        }

        return [...valueItems, valueItem];
      }, []);
  }
  return allOptions.find((option) => option.value === value) || null;
}

export function dateFormatter(date, withTime = true) {
  if (!date) return "-";
  if (!withTime) {
    return new Date(date).toLocaleString([], {
      dateStyle: "medium",
    });
  } else {
    return new Date(date).toLocaleString([], {
      dateStyle: "short",
      timeStyle: "short",
    });
  }
}

export function currencyFormatter(value) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function Checker({ bool }) {
  if (!bool) {
    return <Icon as={Prohibit} color={"red.500"} />;
  } else {
    return <Icon as={CheckCircle} color={"green.500"} />;
  }
}

export function Capatilizer(text) {
  if (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  } else {
    return text;
  }
}

export function topScroller() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export const Month_Names_Full = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

export const Month_Names_Short = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mai",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dez",
];

export const Weekday_Names_Short = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
