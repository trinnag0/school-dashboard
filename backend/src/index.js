const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const { initCronJobs } = require('./cron/jobs');
const { markStudentAttendance } = require('./controllers/attendanceController');
const { checkRole } = require('./middlewares/rbac');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mock Auth
app.use((req, res, next) => {
  req.user = { id: 1, role: 'ADMIN' }; 
  next();
});

// --- API Routes ---

// 1. Dashboard / Budget
app.get('/api/budget', checkRole(['ADMIN', 'HOD', 'TEACHER']), async (req, res) => {
  const budget = await prisma.budget.findFirst({ where: { type: 'ANNUAL' }, orderBy: { year: 'desc' } });
  res.json({ data: budget });
});

// 2. Attendance
app.get('/api/attendance', checkRole(['ADMIN', 'TEACHER']), async (req, res) => {
  const attendance = await prisma.attendanceRecord.findMany({
    include: { student: true, lecture: { include: { subject: true } } },
    take: 50,
    orderBy: { date: 'desc' }
  });
  res.json({ data: attendance });
});

app.post('/api/attendance/mark', checkRole(['TEACHER', 'ADMIN']), markStudentAttendance);

// 3. Fees
app.get('/api/fees', checkRole(['ADMIN', 'HOD']), async (req, res) => {
  const fees = await prisma.fee.findMany({
    include: { student: true },
    orderBy: { dueDate: 'desc' }
  });
  res.json({ data: fees });
});

// 4. Staff / Users
app.get('/api/staff', checkRole(['ADMIN', 'HOD', 'HEAD']), async (req, res) => {
  const staff = await prisma.user.findMany({
    where: { role: { in: ['ADMIN', 'HOD', 'TEACHER', 'HEAD', 'CHANCELLOR', 'DEPUTY', 'CHAPLIN', 'CLERK', 'SENIOR TEACHER'] } },
    select: { id: true, name: true, email: true, role: true, phone: true }
  });
  res.json({ data: staff });
});

app.get('/api/messages', checkRole(['ADMIN', 'HEAD']), async (req, res) => {
  const messages = await prisma.messageLog.findMany({
    orderBy: { sentAt: 'desc' },
    take: 100
  });
  res.json({ data: messages });
});

// 5. Notices, Library, Exams
app.get('/api/notices', async (req, res) => {
  const notices = await prisma.notice.findMany({ orderBy: { date: 'desc' } });
  res.json({ data: notices });
});

app.get('/api/library', async (req, res) => {
  const books = await prisma.libraryBook.findMany();
  res.json({ data: books });
});

app.get('/api/exams', async (req, res) => {
  const exams = await prisma.exam.findMany({ orderBy: { date: 'asc' } });
  res.json({ data: exams });
});

app.get('/api/transport', async (req, res) => {
  const routes = await prisma.transportRoute.findMany();
  res.json({ data: routes });
});

app.get('/api/hostels', async (req, res) => {
  const hostels = await prisma.hostel.findMany();
  res.json({ data: hostels });
});





// 5. Creation Endpoints
app.get('/api/students', checkRole(['ADMIN', 'TEACHER', 'HOD']), async (req, res) => {
  const students = await prisma.student.findMany({
    orderBy: { grade: 'asc' }
  });
  res.json({ data: students });
});

app.post('/api/students', checkRole(['ADMIN']), async (req, res) => {

  const { name, enrollment, grade, guardianId } = req.body;
  const student = await prisma.student.create({
    data: { name, enrollment, grade, guardianId: guardianId || 1 }
  });
  res.json({ data: student });
});

app.post('/api/staff', checkRole(['ADMIN', 'HEAD']), async (req, res) => {
  const { name, email, password, role, phone } = req.body;
  const staff = await prisma.user.create({
    data: { name, email, password: password || 'welcome123', role, phone }
  });
  res.json({ data: staff });
});

// 6. Update Endpoints (Editability)

app.patch('/api/attendance/:id', checkRole(['TEACHER', 'ADMIN']), async (req, res) => {
  const { id } = req.params;
  const { status, remarks } = req.body;
  const updated = await prisma.attendanceRecord.update({
    where: { id: parseInt(id) },
    data: { status, remarks }
  });
  res.json({ data: updated });
});

app.patch('/api/students/:id', checkRole(['ADMIN']), async (req, res) => {
  const { id } = req.params;
  const { name, enrollment, grade } = req.body;
  const updated = await prisma.student.update({
    where: { id: parseInt(id) },
    data: { name, enrollment, grade }
  });
  res.json({ data: updated });
});

app.patch('/api/staff/:id', checkRole(['ADMIN']), async (req, res) => {
  const { id } = req.params;
  const { name, email, role, phone } = req.body;
  const updated = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name, email, role, phone }
  });
  res.json({ data: updated });
});

// 6. Manual Fee Reminder
const twilioService = require('./twilioService');

app.post('/api/fees/remind/:id', checkRole(['ADMIN']), async (req, res) => {
  const { id } = req.params;
  const fee = await prisma.fee.findUnique({
    where: { id: parseInt(id) },
    include: { student: { include: { guardian: true } } }
  });

  if (fee && fee.student.guardian?.phone) {
    const amountDue = fee.amountDue - fee.amountPaid;
    const result = await twilioService.sendReminders(fee.student.guardian.phone, fee.student.name, amountDue);
    
    if (result.success) {
      res.json({ success: true, message: result.message, simulated: result.simulated });
    } else {
      res.status(500).json({ error: result.error || 'Failed to send reminder via Twilio.' });
    }
  } else {
    res.status(400).json({ error: 'Fee not found or no guardian phone available.' });
  }
});


initCronJobs();

app.listen(PORT, () => {
  console.log(`EduFlow Backend listening on http://localhost:${PORT}`);
});

