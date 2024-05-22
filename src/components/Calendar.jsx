import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import deLocale from "@fullcalendar/core/locales/de";
import { useEffect, useState } from "react";
import { HStack, Image, VStack, Flex, chakra } from "@chakra-ui/react";

export default function Calendar() {
  const [events, setEvents] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [activeAvatars, setActiveAvatars] = useState([]);

  useEffect(() => {
    fetch(
      "/api/gcal?" +
        new URLSearchParams({
          foo: ["lk", "alle"].join(","),
        })
    )
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

  function handleAvatar(avatar) {
    activeAvatars.includes(avatar)
      ? setActiveAvatars(activeAvatars.filter((el) => el !== avatar))
      : setActiveAvatars((prevArr) => [...prevArr, avatar]);
  }

  return (
    <VStack alignItems={"stretch"} gap={12} mt={10}>
      <FullCalendar
        height={"30em"}
        // aspectRatio={1.5}
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
      <HStack gap={10} justifyContent={"center"}>
        {["alle", "lk", "sk", "nk", "jk"].map((avatar) => {
          return (
            <Image
              key={avatar}
              className={"avatar-img"}
              borderRadius="full"
              boxSize="110px"
              src={`/avatars/${avatar}.png`}
              outline={
                activeAvatars.includes(avatar) ? "5px solid " : "0px solid"
              }
              outlineColor={"orange.500"}
              transform={{ scale: 2 }}
              sx={
                activeAvatars.includes(avatar)
                  ? { transform: "scale(1.2)" }
                  : { transform: "scale(1)" }
              }
              onClick={() => handleAvatar(avatar)}
            />
          );
        })}
      </HStack>
    </VStack>
  );
}
