// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "./auth/[...nextauth]";

export default async (req, res) => {
  try {
    const { cals } = req.query;
    const calsArr = cals.split(",");

    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req });
    console.log("session", session);
    console.log("token", token);

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

    console.log("oauth2Client", oauth2Client);

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const result = calendar.events.list({
      calendarId: "15o5sfjde220dar98njal5m3u4@group.calendar.google.com",
      timeMin: new Date().toISOString(),
      maxResults: 50,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = (await result).data.items || [];
    // console.log("events", events);
    // const events = result.data.items || [];
    // const json = {
    //   events,
    // };

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({ error: "Internal Error" });
  }
};
