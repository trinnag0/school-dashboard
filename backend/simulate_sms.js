const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function triggerReminder() {
  console.log("Setting up parent phone number...");
  
  // Find a student with an unpaid fee
  const unpaidFee = await prisma.fee.findFirst({
    where: { status: 'UNPAID' },
    include: { student: true }
  });

  if (!unpaidFee) {
    console.log("No unpaid fees found. Creating one...");
    // Create logic if needed, but seed should have created some.
    return;
  }

  // Update the guardian's phone number
  await prisma.user.update({
    where: { id: unpaidFee.student.guardianId },
    data: { phone: '+917682059932' }
  });

  console.log(`Updated guardian phone for student ${unpaidFee.student.name} to +917682059932`);

  // Simulate the reminder
  const content = `Urgent Reminder: Fee for ${unpaidFee.student.name} is ${unpaidFee.status}. Balance: $${unpaidFee.amountDue - unpaidFee.amountPaid}. Please pay immediately.`;
  
  await prisma.messageLog.create({
    data: { 
      recipient: '+917682059932', 
      content: content, 
      type: 'SMS', 
      status: 'SENT' 
    }
  });

  console.log("--------------------------------------------------");
  console.log("SMS SIMULATION TRIGGERED");
  console.log(`To: +917682059932`);
  console.log(`Message: ${content}`);
  console.log("--------------------------------------------------");
  console.log("Successfully logged to Communication Hub!");
}

triggerReminder()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
