// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "./auth/[...nextauth]";

export default async (req, res) => {
  try {
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

    // const authUrl = oauth2Client.generateAuthUrl({
    //   access_type: "offline",
    //   scope: "https://www.googleapis.com/auth/tasks",
    // });
    // console.log("Authorize this app by visiting this url:", authUrl);

    if (oauth2Client.isTokenExpiring()) {
      const { tokens } = await oauth2Client.refreshAccessToken();
      const newAccessToken = tokens.access_token;

      session.user.accessToken = newAccessToken;
    }

    const response = await fetch("https://keep.googleapis.com/v1/notes", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`, // notice the Bearer before your token
      },
    });

    const notes = await oauth2Client.request({
      url: "https://keep.googleapis.com/v1/notes",
    });
    console.log("notes", notes);

    // const service = google.tasks({
    //   version: "v1",
    //   auth: oauth2Client,
    // });

    // const tasks = await service.tasklists.list({
    //   maxResults: 10,
    // });
    // const taskLists = tasks.data.items;
    // if (taskLists && taskLists.length) {
    //   console.log("Task lists:");
    //   taskLists.forEach((taskList) => {
    //     console.log(`${taskList.title} (${taskList.id})`, taskList);
    //   });
    // } else {
    //   console.log("No task lists found.");
    // }

    res.status(200).json({ taskLists });
  } catch (error) {
    console.error("An error occurred: ", error);
    return res.status(500).json({ error: "Internal Error" });
  }
};
