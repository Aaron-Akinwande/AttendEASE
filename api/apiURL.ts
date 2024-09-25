const API_URL = `http://localhost:5000`
const LOGGEDIN = (uid: string) => `${API_URL}/schools/${uid}`
export const ADMIN_LOGIN = `${API_URL}/adminLogin`
export const LECT_LOGIN = `${API_URL}/lectLogin`
export const STUD_LOGIN = `${API_URL}/studLogin`
export const ADMIN = (id) => `${API_URL}/admins/${id}`
export const LECTURERS = (adminId) =>`${API_URL}/admins/${adminId}/lecturers`; 
export const LECTURER = (adminId, lectID) =>`${API_URL}/admins/${adminId}/lecturers/${lectID}`; 
export const GET_COURSES = (adminId) =>`${API_URL}/admins/${adminId}/courses`; 
export const GET_COURSE = (adminId, courseID) =>`${API_URL}/admins/${adminId}/courses/${courseID}`; 
export const NOTIFICATIONS = (adminId) =>`${API_URL}/admins/${adminId}/notifications`; 
export const STUDENTS = (adminId)=> `${API_URL}/admins/${adminId}/students`
export const STUDENT = (adminId, studentId) => `${API_URL}/admins/${adminId}/students/${studentId}`;





export const SIGNUP = `${API_URL}/signup`
export const LOGIN_URL =(schoolId)=> `${API_URL}/schools/${schoolId}/token`;
// export const GET_COURSES = (schoolId) =>`${LOGGEDIN(schoolId)}/courses`; // get and courses

