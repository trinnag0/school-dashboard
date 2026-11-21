const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const markStudentAttendance = async (req, res) => {
  try {
    const { lectureId, studentId, status, remarks } = req.body;
    const teacherId = req.user.id;

    let lecture = null;
    if (lectureId) {
      lecture = await prisma.lecture.findUnique({ where: { id: lectureId } });
      if (!lecture) return res.status(404).json({ message: "Lecture not found" });

      if (req.user.role !== 'ADMIN' && lecture.teacherId !== teacherId) {
        return res.status(403).json({ message: "Forbidden" });
      }
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const whereClause = lectureId 
      ? { type: 'STUDENT', studentId, lectureId }
      : { type: 'STUDENT', studentId, date: { gte: startOfDay } }; // general daily attendance

    let record = await prisma.attendanceRecord.findFirst({
      where: whereClause
    });


    if (record) {
      record = await prisma.attendanceRecord.update({
        where: { id: record.id },
        data: { status, remarks, date: new Date() }
      });
    } else {
      record = await prisma.attendanceRecord.create({
        data: { type: 'STUDENT', status, remarks, studentId, lectureId, date: new Date() }
      });
    }

    return res.status(200).json({ message: "Attendance marked", data: record });
  } catch (error) {
    return res.status(500).json({ message: "Error marking attendance", error: error.message });
  }
};

module.exports = { markStudentAttendance };
