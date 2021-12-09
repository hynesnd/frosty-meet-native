import React, { createContext, useState } from "react";

export const EventContext = React.createContext();

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState({
    _id: "61b0cf67d802748ef1433440",
    title: "Event1",
    description:
      "This is the description and it is quite a long description as you can see",
    location: {
      longitude: "-8.1927645",
      latitude: "41.124339",
      name: "pin name",
      description: "pin description",
    },
    image: "https://source.unsplash.com/random/50x50",
    categories: [{ category_name: "Social" }],
    tags: [],
    participants: ["neil123", "balli123"],
    dateCreated: "date",
    date1: "10/12/2021",
    time1: "12:30",
    date2: "10/12/2021",
    time2: "14:45",
    creator: { username: "balli123" },
  });
  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};
