import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from "react-datepicker";
import toast from 'react-hot-toast';
import * as Yup from "yup";
import Button from '../Button/Button.jsx';
import css from "./BookForm.module.css";

const FeedbackSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Must be a valid email!").required("Required"),
    date: Yup.date().nullable().min(new Date(), "Date cannot be in the past"),
    comment: Yup.string().max(256, "Too long")
});
const initialValues = {
    name: "",
    email: '',
    date: null,
    comment: ""
}

export default function BookForm() {
    const handleSubmit = (values, actions) => {
    actions.resetForm();
    toast.success("")
}
    return (
        <div className={css.bookForm}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
                <Form className={css.form}>
                    <div className={css.inputWrapper}>
                    <Field className={css.input} type="text" name="name" placeholder="Name" />
                        <ErrorMessage name="name" component="span" className="error" />
                    </div>
                    <div className={css.inputWrapper}>
                    <Field className={css.input} type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="span" className="error" />
                    </div>
                    <div className={css.inputWrapper}>
                <Field className={css.input} type="date" name="date" placeholder="Booking date" />
                <ErrorMessage name="date" component="span" className="error" />
                    </div>
                    <div className={css.inputWrapper}>
                    <Field className={css.textarea} as="textarea" name="comment" placeholder="Comment" />
        <ErrorMessage name="comment" component="span" className="error" />
                    </div>
                    <Button type='submit'>Send</Button>
                </Form>
            </Formik>
</div>
    );
}