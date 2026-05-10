// Backend server for TaskR - Todo List App with SMS/WhatsApp reminders
// Setup Instructions:
// 1. npm install express cors dotenv twilio
// 2. Create .env file with TWILIO credentials:
//    TWILIO_ACCOUNT_SID=your_account_sid
//    TWILIO_AUTH_TOKEN=your_auth_token
//    TWILIO_PHONE_NUMBER=+1234567890 (your Twilio phone number)
//    TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890 (your Twilio WhatsApp number)

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const twilio = require('twilio');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Twilio client
const twilio Client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// API endpoint to send reminders
app.post('/api/send-reminder', async (req, res) => {
  try {
    const { phoneNumber, method, taskName } = req.body;

    // Validate input
    if (!phoneNumber || !method || !taskName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Format phone number (ensure it starts with +)
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber}`;
    
    const message = `TaskR: Your task "${taskName}" is overdue!`;

    if (method === 'sms') {
      // Send SMS via Twilio
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formattedPhone
      });
      console.log(`SMS sent to ${formattedPhone}`);
    } else if (method === 'whatsapp') {
      // Send WhatsApp message via Twilio
      await twilioClient.messages.create({
        body: message,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${formattedPhone}`
      });
      console.log(`WhatsApp message sent to ${formattedPhone}`);
    }

    res.json({ success: true, message: 'Reminder sent successfully' });
  } catch (error) {
    console.error('Error sending reminder:', error);
    res.status(500).json({ error: 'Failed to send reminder', details: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TaskR reminder server running on port ${PORT}`);
  console.log('Make sure you have TWILIO credentials in .env file');
});
