// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "./auth/[...nextauth]";

export default async (req, res) => {
  try {
    // +++++++++++++++++++++
    // AUTH
    // +++++++++++++++++++++
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req });
    console.log("session", session);
    console.log("token getToken", token);

    if (!session) {
      return res.status(401).json({ error: "No Session Active" });
    }

    const accessToken = session?.accessToken;
    const refreshToken = session?.refreshToken;

    if (!accessToken) {
      return res.status(401).json({ error: "No Access Token" });
    }

    const oauth2Client = new google.auth.OAuth2({});

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (oauth2Client.isTokenExpiring()) {
      const { tokens } = await oauth2Client.refreshAccessToken();
      const newAccessToken = tokens.access_token;

      session.user.accessToken = newAccessToken;
    }

    // console.log("oauth2Client", oauth2Client);

    // +++++++++++++++++++++
    // GET CALENDAR EVENTS
    // +++++++++++++++++++++

    const { cals } = req.query;
    const calsParams = cals?.split(",") || [];

    let allIDs = [];
    const alleCalIds = [
      "15o5sfjde220dar98njal5m3u4@group.calendar.google.com", // ALLE
      "c_4f27396d8df958dc4c4e421a49473e0e7571bd176ba15d9be1a97b0f70dbb5e4@group.calendar.google.com", // MÜLL
    ];
    const jonasCalIds = [
      "419606b94192f9268bccd4e2c21653a2dd519af83dca06060b84d5ebac21fe72@group.calendar.google.com",
      "kfjresb61dnbrqo4a7gtr1aaq53vnh58@import.calendar.google.com", //SV 06 Holzminden III (E-Junioren)
    ];

    const noraCalIds = [
      "a87d093d35f2198f1dadcd7054d92f8f51796a9e5c736a941403ddbeeb4ef70c@group.calendar.google.com",
    ];

    const larsCalIds = ["info@larsknoke.com"];

    if (calsParams.includes("alle")) {
      allIDs = allIDs.concat(alleCalIds);
    }
    if (calsParams.includes("jk")) {
      allIDs = allIDs.concat(jonasCalIds);
    }
    if (calsParams.includes("nk")) {
      allIDs = allIDs.concat(noraCalIds);
    }
    if (calsParams.includes("lk")) {
      allIDs = allIDs.concat(larsCalIds);
    }

    const uniqIds = [...new Set(allIDs)];

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const allPromiseEvents = await Promise.all(
      uniqIds.map(async (calID) => {
        const calData = await calendar.events.list({
          calendarId: calID,
          timeMin: new Date().toISOString(),
          maxResults: 50,
          singleEvents: true,
          orderBy: "startTime",
        });
        const events = calData.data.items || [];
        return events;
      })
    );

    res
      .status(200)
      .json({ success: true, events: allPromiseEvents.flat(Infinity) });
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({ error: "Internal Error" });
  }
};
