const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Seeding Comprehensive EduFlow Database...');

  // --- 1. Clean Database ---
  await prisma.attendanceRecord.deleteMany();
  await prisma.lecture.deleteMany();
  await prisma.fee.deleteMany();
  await prisma.student.deleteMany();
  await prisma.budget.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.classGroup.deleteMany();
  await prisma.user.deleteMany();
  await prisma.notice.deleteMany();
  await prisma.libraryBook.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.transportRoute.deleteMany();
  await prisma.hostel.deleteMany();

  // ... (rest remains same until Exams section)


  // ... (Users and subjects section remains similar but I'll add more subjects)

  // --- 2. Create Users (Admins, Board, HODs, Teachers) ---
  const users = await Promise.all([
    prisma.user.create({ data: { email: 'head@eduflow.com', password: 'password123', name: 'Dr. Sarah Wilson', role: 'HEAD', phone: '+1234567890' } }),
    prisma.user.create({ data: { email: 'chancellor@eduflow.com', password: 'password123', name: 'Hon. Robert Miller', role: 'CHANCELLOR', phone: '+111111111' } }),
    prisma.user.create({ data: { email: 'deputy@eduflow.com', password: 'password123', name: 'Dr. Emily Blunt', role: 'DEPUTY', phone: '+222222222' } }),
    prisma.user.create({ data: { email: 'chaplin@eduflow.com', password: 'password123', name: 'Fr. John Smith', role: 'CHAPLIN', phone: '+333333333' } }),
    prisma.user.create({ data: { email: 'clerk@eduflow.com', password: 'password123', name: 'Mr. David Clerk', role: 'CLERK', phone: '+444444444' } }),
    prisma.user.create({ data: { email: 'senior@eduflow.com', password: 'password123', name: 'Ms. Margaret Hamilton', role: 'SENIOR TEACHER', phone: '+555555555' } }),
    prisma.user.create({ data: { email: 'hod.science@eduflow.com', password: 'password123', name: 'Prof. Alan Turing', role: 'HOD', phone: '+111222333' } }),
    prisma.user.create({ data: { email: 'teacher1@eduflow.com', password: 'password123', name: 'Mr. James Bond', role: 'TEACHER', phone: '+777888999' } }),
  ]);

  const [head, chancellor, deputy, chaplin, clerk, senior, hodScience, teacher1] = users;
  const admin = head;

  // --- 3. Create Subjects ---
  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: 'Quantum Physics', code: 'PHY401', department: 'Science' } }),
    prisma.subject.create({ data: { name: 'Organic Chemistry', code: 'CHM302', department: 'Science' } }),
    prisma.subject.create({ data: { name: 'Modern Art History', code: 'ART101', department: 'Arts' } }),
    prisma.subject.create({ data: { name: 'Creative Writing', code: 'ENG205', department: 'Arts' } }),
    prisma.subject.create({ data: { name: 'Business Ethics', code: 'BUS101', department: 'Commerce' } }),
    prisma.subject.create({ data: { name: 'Macroeconomics', code: 'ECO201', department: 'Commerce' } }),
  ]);

  // --- 4. Create Class Groups ---
  const groups = await Promise.all([
    prisma.classGroup.create({ data: { name: 'Grade 12-Science' } }),
    prisma.classGroup.create({ data: { name: 'Grade 12-Arts' } }),
    prisma.classGroup.create({ data: { name: 'Grade 11-Commerce' } }),
  ]);

  // --- 5. Create Students ---
  const studentData = [
    { name: 'Alex Johnson', enrollment: 'STU001', grade: '12-Science' },
    { name: 'Bella Swan', enrollment: 'STU002', grade: '12-Science' },
    { name: 'Charlie Brown', enrollment: 'STU003', grade: '12-Arts' },
    { name: 'Daisy Ridley', enrollment: 'STU004', grade: '12-Arts' },
    { name: 'Ethan Hunt', enrollment: 'STU005', grade: '11-Commerce' },
    { name: 'Fiona Gallagher', enrollment: 'STU006', grade: '11-Commerce' },
    { name: 'George Weasley', enrollment: 'STU007', grade: '12-Science' },
    { name: 'Harry Potter', enrollment: 'STU008', grade: '12-Science' },
    { name: 'Iris West', enrollment: 'STU009', grade: '12-Arts' },
    { name: 'Jack Sparrow', enrollment: 'STU010', grade: '11-Commerce' },
  ];

  const students = await Promise.all(
    studentData.map(s => prisma.student.create({
      data: { ...s, guardianId: admin.id }
    }))
  );

  // --- 6. Create Budgets ---
  await prisma.budget.createMany({
    data: [
      { type: 'ANNUAL', amount: 1500000, spent: 450000, year: 2024, managerId: head.id },
      { type: 'DEPARTMENTAL', department: 'Science', amount: 300000, spent: 120000, year: 2024, managerId: hodScience.id },
      { type: 'DEPARTMENTAL', department: 'Arts', amount: 200000, spent: 50000, year: 2024, managerId: deputy.id },
    ]
  });

  // --- 7. Create Fees ---
  const feeRecords = [];
  students.forEach(s => {
    // Term 1
    feeRecords.push({
      term: 'Term 1',
      amountDue: 5000,
      amountPaid: Math.random() > 0.3 ? 5000 : 2000,
      status: Math.random() > 0.3 ? 'PAID' : 'PARTIAL',
      dueDate: new Date('2024-03-01'),
      studentId: s.id
    });
    // Term 2
    feeRecords.push({
      term: 'Term 2',
      amountDue: 5000,
      amountPaid: 0,
      status: 'UNPAID',
      dueDate: new Date('2024-06-01'),
      studentId: s.id
    });
  });
  await prisma.fee.createMany({ data: feeRecords });

  // --- 8. Create Notices ---
  await prisma.notice.createMany({
    data: [
      { title: 'Annual Sports Meet 2024', content: 'The annual sports meet will be held on Oct 20th.', priority: 'High', category: 'Event' },
      { title: 'Diwali Holiday Announcement', content: 'School will remain closed from Oct 28th to Nov 2nd.', priority: 'Medium', category: 'Holiday' },
      { title: 'Mid-Term Exam Schedule', content: 'Mid-term exams start from Sept 15th. Check the exam section for details.', priority: 'High', category: 'Academic' },
      { title: 'New Library Books Added', content: 'Over 100 new books have been added to the science section.', priority: 'Low', category: 'Academic' },
    ]
  });

  // --- 9. Create Library Books ---
  await prisma.libraryBook.createMany({
    data: [
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Literature' },
      { title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science' },
      { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Psychology' },
      { title: 'The Art of War', author: 'Sun Tzu', category: 'Strategy' },
      { title: 'Code Complete', author: 'Steve McConnell', category: 'Computer Science' },
    ]
  });

  // --- 10. Create Exams ---
  await prisma.exam.createMany({
    data: [
      { title: 'Physics Mid-Term', subject: 'Quantum Physics', date: new Date('2024-09-15T09:00:00'), duration: '3 Hours', room: 'Hall A' },
      { title: 'Art History Quiz', subject: 'Modern Art History', date: new Date('2024-09-16T10:30:00'), duration: '1 Hour', room: 'Room 102' },
      { title: 'Business Ethics Final', subject: 'Business Ethics', date: new Date('2024-09-18T14:00:00'), duration: '2 Hours', room: 'Hall B' },
    ]
  });

  // --- 11. Create Transport ---
  await prisma.transportRoute.createMany({
    data: [
      { routeName: 'Route A - Downtown', vehicleNo: 'SCH-001', driverName: 'John Doe', driverPhone: '+1234567890' },
      { routeName: 'Route B - Westside', vehicleNo: 'SCH-002', driverName: 'Jane Smith', driverPhone: '+0987654321' },
    ]
  });

  // --- 12. Create Hostel ---
  await prisma.hostel.createMany({
    data: [
      { name: 'North Wing', type: 'Boys', capacity: 100, available: 15 },
      { name: 'South Wing', type: 'Girls', capacity: 120, available: 20 },
    ]
  });

  console.log('✅ Seeding completed successfully!');
  console.log(`Users: ${await prisma.user.count()}`);
  console.log(`Students: ${await prisma.student.count()}`);
  console.log(`Notices: ${await prisma.notice.count()}`);
  console.log(`Books: ${await prisma.libraryBook.count()}`);
  console.log(`Exams: ${await prisma.exam.count()}`);
  console.log(`Routes: ${await prisma.transportRoute.count()}`);
  console.log(`Hostels: ${await prisma.hostel.count()}`);
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


