import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import deLocale from "@fullcalendar/core/locales/de";
import { useEffect, useState } from "react";

export default function Calendar() {
  const [events, setEvents] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gcal")
      .then((res) => res.json())
      .then((data) => {
        const events = data.events?.map((e) => {
          return {
            title: e.summary,
            start: e.start.date || e.start.dateTime,
            end: e.end.date || e.end.datTime,
          };
        });
        setEvents(events);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* <p>{JSON.stringify(events)}</p> */}
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        locale={deLocale}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridWeek,dayGridDay",
        }}
        eventMinHeight={30}
        events={events}
      />
    </>
  );
}
