type Formats =
  | "short"
  | "medium"
  | "long"
  | "shortDate"
  | "mediumDate"
  | "longDate";

const DateFormat: Record<Formats, Intl.DateTimeFormatOptions> = {
  short: {
    // 6/30/24, 7:00 PM
    timeStyle: "short",
    dateStyle: "short",
  },
  medium: {
    // Jun 30, 2024, 7:00:00 PM
    timeStyle: "medium",
    dateStyle: "medium",
  },
  long: {
    // June 30, 2024 at 7:00:00 PM CDT
    timeStyle: "long",
    dateStyle: "long",
  },
  shortDate: {
    // 6/30/24
    dateStyle: "short",
  },
  mediumDate: {
    // Jun 30, 2024
    dateStyle: "medium",
  },
  longDate: {
    // June 30, 2024
    dateStyle: "long",
  },
};

const formatDate = (
  date: string | number | Date,
  dateFormat: Intl.DateTimeFormatOptions = DateFormat.mediumDate
) => new Date(date.toString()).toLocaleString("en-US", dateFormat);

export { DateFormat, formatDate };
