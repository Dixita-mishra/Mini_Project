require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRouter = require('./src/routers/auth.router');
const adminRouter = require('./src/routers/admin.router');
const chatbotRouter = require('./src/routers/chatbot.router');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/chat', chatbotRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});