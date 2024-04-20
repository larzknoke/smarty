// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { google } from "googleapis";

export const SCOPES = ["https://www.googleapis.com/auth/tasks"];

export default async function handler(req, res) {
  const privateKey = JSON.parse(process.env.GOOGLE_PRIVATE_KEY).private_key;
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    projectId: process.env.GOOGLE_PROJECTID,
    credentials: {
      private_key: privateKey,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
    },
  });
  const authToken = await auth.getClient();

  // authToken.authorize((err, tokens) => {
  //   if (err) {
  //     console.log("ERROR", err);
  //   } else {
  //     console.log("Google Authenticated");
  //     console.log("Google tokens", tokens);
  //   }
  // });

  const service = google.tasks({ version: "v1", auth: authToken });

  const tasks = await service.tasklists.list({
    maxResults: 10,
  });
  const taskLists = tasks.data.items;
  if (taskLists && taskLists.length) {
    console.log("Task lists:");
    taskLists.forEach((taskList) => {
      console.log(`${taskList.title} (${taskList.id})`, taskList);
    });
  } else {
    console.log("No task lists found.");
  }

  res.status(200).json({ taskLists });
}
