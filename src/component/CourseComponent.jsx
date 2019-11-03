import React, {Component} from "react";
import CourseDataService from "../service/CourseDataService";
import {Formik, Form, Field, ErrorMessage} from 'formik';

class CourseComponent extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            description: ''
        }
    }

    componentDidMount() {

        if (this.state.id === -1) {
            return
        }

        CourseDataService.retrieveCourse(this.state.id)
            .then(response => this.setState({
                name: response.data.name,
                description: response.data.description
            }))
    }

    render() {
        let id = this.state.id;
        let name = this.state.name;
        let description = this.state.description;
        return (
            <div>
                <h3>Course</h3>
                <div className="container">
                    <Formik initialValues={{id, name, description}}
                            onSubmit={this.onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={this.validate}
                            enableReinitialize={true}
                    >
                        {
                            () => (
                                <Form>
                                    <ErrorMessage name="description" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

    onSubmit(values) {
        let course = {
            id: values.id,
            name: values.name,
            description: values.description,
            targetDate:
            values.targetDate
        }

        if (this.state.id === 'add') {
            CourseDataService.createCourse(course)
                .then(() => this.props.history.push('/courses'))
        } else {
            CourseDataService.updateCourse(this.state.id, course)
                .then(() => this.props.history.push('/courses'))
        }
    }

    validate(values) {
        let errors = {};

        if (!values.name)
            errors.name = 'Enter a name';
        else if (values.name.length < 3)
            errors.name = 'Enter atleast 3 char in name';

        if (!values.description)
            errors.description = 'Enter a description';
        else if (values.description.length < 5)
            errors.description = 'Enter atleast 5 char in description';

        return errors;
    }
}

export default CourseComponent;