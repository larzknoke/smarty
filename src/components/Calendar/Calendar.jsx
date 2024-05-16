import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import deLocale from "@fullcalendar/core/locales/de";

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
      locale={deLocale}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "dayGridWeek,dayGridDay",
      }}
      events={[
        {
          title: "event 1",
          start: "2024-05-13T10:30:00",
          end: "2024-05-14T11:30:00",
          allDay: false,
        },
        {
          title: "event 10",
          start: "2024-05-13T09:00:00",
          end: "2024-05-14T09:30:00",
          allDay: false,
        },
        { title: "event 2", date: "2024-05-17" },
        { title: "event 3", date: "2024-05-17" },
      ]}
    />
  );
}
