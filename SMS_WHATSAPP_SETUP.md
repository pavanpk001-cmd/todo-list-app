# TaskR - SMS & WhatsApp Reminders Setup Guide

## Overview
This guide will help you set up SMS and WhatsApp message reminders for the TaskR todo app using Twilio.

## What You Need

1. **Twilio Account** (Free trial available)
   - Sign up at: https://www.twilio.com/try-twilio
   - Free credits ($15) are provided to test

2. **Node.js** installed on your machine
   - Download from: https://nodejs.org/

## Step-by-Step Setup

### 1. Get Twilio Credentials

1. Go to https://console.twilio.com/
2. Find your **Account SID** and **Auth Token** on the dashboard
3. Go to "Phone Numbers" → "Manage Numbers" 
4. Purchase a phone number (or use trial number) for SMS
5. For WhatsApp:
   - Go to Messaging → WhatsApp
   - Follow setup to get WhatsApp sandbox number

### 2. Create `.env` File

Copy `.env.example` to `.env` and fill in your Twilio details:

```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_WHATSAPP_NUMBER=+1234567890
PORT=3000
```

### 3. Install Dependencies

```bash
cd "To do list projct"
npm install express cors dotenv twilio
```

### 4. Start the Backend Server

```bash
node server.js
```

You should see:
```
TaskR reminder server running on port 3000
```

### 5. Update Frontend

In the todo app:
1. Click the settings icon (⚙️) to expand notification options
2. Enter your phone number
3. Select SMS or WhatsApp as your reminder method
4. When a task becomes overdue, you'll receive a message!

## Testing

1. Create a task with a due date/time set to a past time
2. Wait for the app to detect it as overdue (checks every minute)
3. You should receive an SMS or WhatsApp message

## Deployment

For production deployment:

### Option 1: Local Server
- Run `node server.js` on your machine 24/7
- Update frontend to point to `http://yourmachine.local:3000/api/send-reminder`

### Option 2: Deploy to Heroku (Recommended)
```bash
npm install -g heroku-cli
heroku create your-taskr-app
git push heroku main
```

### Option 3: Deploy to Render
- Connect GitHub repo to render.com
- Set environment variables in dashboard
- Deploy automatically

## Troubleshooting

**"Backend unavailable" message:**
- Make sure Node server is running
- Check firewall/port settings
- Verify .env file has correct Twilio credentials

**Messages not sending:**
- Check Twilio trial mode limits
- Verify phone number format (+1234567890)
- Check server logs for errors

**WhatsApp not working:**
- Ensure you've completed WhatsApp sandbox setup on Twilio
- WhatsApp only works with sandbox numbers in trial

## Next Steps

- Set up multiple reminder methods
- Add reminder scheduling (daily, weekly)
- Integrate with calendar apps
- Add voice call reminders

Questions? Check Twilio docs: https://www.twilio.com/docs
