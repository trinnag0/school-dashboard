const twilio = require('twilio');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;

let client = null;
if (accountSid && accountSid !== "your_twilio_account_sid_here" && authToken && authToken !== "your_twilio_auth_token_here") {
  client = twilio(accountSid, authToken);
}

const twilioService = {
  sendReminders: async (recipientPhone, studentName, amountDue) => {
    const messageContent = `Urgent Reminder: School fees for ${studentName} are currently unpaid. Please clear the pending dues of $${amountDue} immediately to avoid late fees.`;
    
    // Log in our internal system first
    await prisma.messageLog.create({
      data: { recipient: recipientPhone, content: messageContent, type: 'SMS/WA', status: 'PENDING' }
    });

    if (!client) {
      console.log(`[Twilio Simulation] To: ${recipientPhone} | Msg: ${messageContent}`);
      // Simulate success if Twilio isn't configured
      await prisma.messageLog.updateMany({
        where: { recipient: recipientPhone, content: messageContent, status: 'PENDING' },
        data: { status: 'SENT_SIMULATED' }
      });
      return { success: true, simulated: true, message: "Simulated sending because Twilio credentials are missing." };
    }

    try {
      // 1. Send SMS
      if (twilioPhoneNumber) {
        await client.messages.create({
          body: messageContent,
          from: twilioPhoneNumber,
          to: recipientPhone
        });
        console.log(`[Twilio] SMS sent to ${recipientPhone}`);
      }

      // 2. Send WhatsApp
      if (twilioWhatsAppNumber) {
        // Twilio requires WhatsApp numbers to be prefixed with 'whatsapp:'
        const waFrom = twilioWhatsAppNumber.startsWith('whatsapp:') ? twilioWhatsAppNumber : `whatsapp:${twilioWhatsAppNumber}`;
        const waTo = recipientPhone.startsWith('whatsapp:') ? recipientPhone : `whatsapp:${recipientPhone}`;
        
        await client.messages.create({
          body: messageContent,
          from: waFrom,
          to: waTo
        });
        console.log(`[Twilio] WhatsApp sent to ${recipientPhone}`);
      }

      // Update log status to SUCCESS
      await prisma.messageLog.updateMany({
        where: { recipient: recipientPhone, content: messageContent, status: 'PENDING' },
        data: { status: 'SENT_REAL' }
      });

      return { success: true, simulated: false, message: "SMS and WhatsApp sent successfully via Twilio." };

    } catch (error) {
      console.error("[Twilio Error]", error);
      
      // Update log status to FAILED
      await prisma.messageLog.updateMany({
        where: { recipient: recipientPhone, content: messageContent, status: 'PENDING' },
        data: { status: 'FAILED' }
      });
      
      return { success: false, simulated: false, error: error.message };
    }
  }
};

module.exports = twilioService;
