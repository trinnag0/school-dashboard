const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const twilioService = require('../twilioService');

const smsService = {
  send: async (recipient, content) => {
    console.log(`[SMS] To ${recipient}: ${content}`);
    await prisma.messageLog.create({
      data: { recipient, content, type: 'SMS', status: 'SENT' }
    });
  }
};

const send_monthly_fee_reminders = () => {
  cron.schedule('0 10 28-31 * *', async () => {
    try {
      const unpaidFees = await prisma.fee.findMany({
        where: { status: { in: ['UNPAID', 'PARTIAL'] } },
        include: { student: { include: { guardian: true } } }
      });

      for (const fee of unpaidFees) {
        if (fee.student.guardian?.phone) {
          const amountDue = fee.amountDue - fee.amountPaid;
          await twilioService.sendReminders(fee.student.guardian.phone, fee.student.name, amountDue);
        }
      }
    } catch (e) { console.error("Fee reminder job error:", e); }
  });
};


const send_attendance_summary_3_weeks = () => {
  let weekCounter = 1;
  cron.schedule('0 12 * * 5', async () => {
    if (weekCounter % 3 !== 0) { weekCounter++; return; }
    weekCounter = 1;

    try {
      const threeWeeksAgo = new Date();
      threeWeeksAgo.setDate(threeWeeksAgo.getDate() - 21);

      const students = await prisma.student.findMany({
        include: { guardian: true, attendance: { where: { date: { gte: threeWeeksAgo } } } }
      });

      for (const student of students) {
        if (!student.guardian?.phone) continue;
        const present = student.attendance.filter(r => r.status === 'PRESENT').length;
        const total = student.attendance.length;
        await smsService.send(student.guardian.phone, `3-Week Attendance: ${student.name} was present ${present}/${total} times.`);
      }
    } catch (e) { console.error("Attendance summary job error:", e); }
  });
};

const initCronJobs = () => {
  send_monthly_fee_reminders();
  send_attendance_summary_3_weeks();
  console.log("EduFlow Cron Jobs Initialized.");
};

module.exports = { initCronJobs };
