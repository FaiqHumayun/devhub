'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export default function SignUpForm() {
  return (
    <div className="w-full max-w-2xs sm:max-w-md xl:max-w-2xl flex flex-col items-center justify-center bg-black">
      <div className="rounded shadow-md w-full flex flex-col gap-4">
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            fetch('/api/auth/signup', {
              method: 'POST',
              body: JSON.stringify(values),
            });
            
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="bg-white border rounded px-3 py-2 w-full"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="bg-white border rounded px-3 py-2 w-full"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="bg-white border rounded px-3 py-2 w-full"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <button
                type="submit"
                className="bg-primary-green text-white py-2 rounded hover:bg-primary-blue transition-colors cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
