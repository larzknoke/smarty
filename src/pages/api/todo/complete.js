import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  console.log("api call");

  if (req.method == "POST") {
    try {
      const data = req.body;
      console.log("data: ", data);
      const result = await prisma.todo.update({
        where: {
          id: data,
        },
        data: {
          completed: true,
        },
      });
      console.log("result: ", result);
      return res.status(200).json({ success: true, result });
    } catch (error) {
      console.log("api error: ", error);
      return res.status(500).json(error);
    }
  }

  //   if (req.method == "GET") {
  //     try {
  //       const result = await prisma.kampagne.findMany();
  //       console.log("result: ", result);
  //       return res.status(200).json(result);
  //     } catch (error) {
  //       console.log("api error: ", error);
  //       return res.status(500).json(error);
  //     }
  //   }
}
