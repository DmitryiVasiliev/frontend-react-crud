import axios from 'axios'

const COURSE_API_URL = 'http://localhost:8080';

class CourseDataService {

    retrieveAllCourses() {
        return axios.get(`${COURSE_API_URL}/courses`);
    }

    deleteCourse(id) {
        return axios.delete(`${COURSE_API_URL}/courses/${id}`);
    }

    retrieveCourse(id) {
        return axios.get(`${COURSE_API_URL}/courses/${id}`);
    }

    updateCourse(id, course) {
        return axios.put(`${COURSE_API_URL}/courses/${id}`, course);
    }

    createCourse(course) {
        return axios.post(`${COURSE_API_URL}/courses/`, course);
    }
}

export default new CourseDataService()
