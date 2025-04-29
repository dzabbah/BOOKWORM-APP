import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
    https
        .get(process.env.API_URL, (res) => {
            if (res.statusCode === 200) console.log("GET request sent successfully");
            else console.log("GET request failed", res.statusCode);
        })
        .on("error", (e) => console.error("Error while sending request", e));
});

export default job;

// CRON JOB EXPLANATION: 
// Cron jobs are scheduled tasks that run periodically at fixed intervls
// we want to send 1 GET request for every 14 minutes

// How to define a "Schedule" ?
// You define a schedule using a cron expression, wich consists of five fields representing:

//! MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

//? EXAMPLES && EXPLANATION:
//* 14 * * * * - Every 14 minutes
//* 0 0 * * 0 - At mignight on every Sunday
//* 30 3 15 * * - At 3:30 AM, on the 15th of every month
//* 0 0 1 1 * - At ,idnight, on January 1st
//* 0 * * * * - Every hour
