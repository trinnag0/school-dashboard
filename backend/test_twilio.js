const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const twilioService = require('./src/twilioService');

async function testTwilio() {
  console.log("Triggering Twilio Service Test...");
  const recipientPhone = '+917682059932';
  const studentName = 'Bella Swan (Test)';
  const amountDue = 4500;

  const result = await twilioService.sendReminders(recipientPhone, studentName, amountDue);
  console.log("Result:", result);
}

testTwilio()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
