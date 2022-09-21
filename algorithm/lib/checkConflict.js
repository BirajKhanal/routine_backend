const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const TIME_SLOTS = ["7:00-8:30", "8:30-10:00", "10:40-12:10", "12:10-1:20"];

/**
 *
 * return true if conflict
 *
 */
const checkIsConflict = (
  departments,
  departmentName,
  semester,
  subjectAlias,
  teacherAlias,
  weekDayIdx,
  timeSlotIdx
) => {
  // check if sub repeat in that day
  const department = departments.find((dept) => dept.name === departmentName);

  const routine = JSON.parse(
    department.routines.find((routine) => routine.semester === semester)
  );

  let subRepeatCount = 0;
  for (let i = 0; i < TIME_SLOTS.length; i++) {
    /**
     * L-PHY-PKT
     */
    const currentSubjectAlias = routine[weekDayIdx][timeSlotIdx].split("-")[1];
    if (currentSubjectAlias === subjectAlias) ++subRepeatCount;
  }

  if (subRepeatCount > 1) return true;

  // check if teacher repeat in same day & time slot for all semester and faculties

  let teacherRepeatCount = 0;
  departments.forEach((dept) => {
    dept.routines.forEach((routine) => {
      const currentTeacherAlias =
        routine[weekDayIdx][timeSlotIdx].split("-")[2];
      if (currentTeacherAlias === teacherAlias) ++teacherRepeatCount;
    });
  });

  if (teacherRepeatCount > 1) return true;

  return false;
};

module.exports = { checkIsConflict };
