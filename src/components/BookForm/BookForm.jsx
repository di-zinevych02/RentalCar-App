import { Formik, Form, Field, ErrorMessage } from 'formik';
import DatePicker from "react-datepicker";

import toast from 'react-hot-toast';
import * as Yup from "yup";
import Button from '../Button/Button.jsx';
import css from "./BookForm.module.css";
import { useState } from "react";
import { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale";

// Копія локалі, але з модифікованими назвами днів
const customLocale = {
  ...enUS,
  localize: {
    ...enUS.localize,
    day: (n) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][n],
  },
};

registerLocale("custom", customLocale);

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
    const [startDate, setStartDate] = useState(new Date());;
    const handleSubmit = (values, actions) => {
    actions.resetForm();
    toast.success("")
}
    return (
        <div className={css.bookForm}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={FeedbackSchema}>
                <Form className={css.form}>
                        <h3 className={css.title}>Book your car now</h3>
                        <p className={css.description}>Stay connected! We are always ready to help you.</p>
                <div className={css.inputsWrapper}>
                    <div className={css.inputWrapper}>
                    <Field className={css.input} type="text" name="name" placeholder="Name" />
                        <ErrorMessage name="name" component="span" className={css.errorMess} />
                    </div>
                    <div className={css.inputWrapper}>
                    <Field className={css.input} type="email" name="email" placeholder="Email" />
                    <ErrorMessage name="email" component="span" className={css.errorMess} />
                    </div>
                    <div className={css.inputWrapper}>
                        <DatePicker
                                className={css.input}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Booking date"
                                locale="custom"
                                dateFormat="MMM d, yyyy"
                                minDate={new Date()}
                                
                                showPopperArrow={false}
                        />
                <ErrorMessage name="date" component="span" className={css.errorMess} />
                    </div>
                    <div className={css.inputWrapper}>
                    <Field className={css.textarea} as="textarea" name="comment" placeholder="Comment" />
        <ErrorMessage name="comment" component="span" className={css.errorMess} />
                        </div>
                    </div>
                    <div className={css.btnWrapper}>
                        <Button type='submit'>Send</Button>
                        </div>
                </Form>
            </Formik>
</div>
    );
}