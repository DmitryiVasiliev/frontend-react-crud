import React, {Component} from "react";
import CourseDataService from "../service/CourseDataService";

class ListCoursesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            courses: [],
            message: null
        }
        this.refreshCourses = this.refreshCourses.bind(this)
        this.updateCourseClicked = this.updateCourseClicked.bind(this)
        this.addCourseClicked = this.addCourseClicked.bind(this)
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        CourseDataService.retrieveAllCourses()
            .then(
                response => {
                    this.setState({courses: response.data})
                }
            )
    }

    render() {
        return (
            <div className="container">
                <h3>All Courses</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.courses.map(
                                course =>
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.name}</td>
                                        <td>{course.description}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateCourseClicked(course.id)}>Update
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning"
                                                    onClick={() => this.deleteCourseClicked(course.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addCourseClicked}>Add</button>
                </div>
            </div>
        )
    }

    deleteCourseClicked(id) {
        CourseDataService.deleteCourse(id)
            .then(() => {
                this.setState({message: `Delete of course ${id} Successful`})
                this.refreshCourses()
            })
    }

    updateCourseClicked(id) {
        this.props.history.push(`/courses/${id}`)
    }

    addCourseClicked() {
        this.props.history.push(`/courses/add`)
    }
}

export default ListCoursesComponent