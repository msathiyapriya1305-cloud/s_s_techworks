const cron = require("node-cron");
const Project = require("../models/Project");
const Notification = require("../models/Notification");

cron.schedule("0 9 * * *", async () => {
  console.log("Checking upcoming deadlines...");

  const oneWeekLater = new Date();
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);

  const start = new Date(oneWeekLater.setHours(0,0,0,0));
  const end = new Date(oneWeekLater.setHours(23,59,59,999));

  const projects = await Project.find({
    deadline: { $gte: start, $lte: end }
  });

  for (let p of projects) {
    await Notification.create({
      message: `Reminder: ${p.projectType} deadline in 1 week (${new Date(p.deadline).toDateString()})`
    });
  }
});
