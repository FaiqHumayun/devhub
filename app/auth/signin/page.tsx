'use client';

import { Formik, Form, Field } from "formik";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push('/dashboard');
      }
    });
  }, [router]);

  const handleGitHubSignIn = () => {
    signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-black gap-3 h-full">
      <h1 className="mt-2 text-center text-xl lg:text-2xl text-primary-blue">
        Connect with the developer community
      </h1>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values, { setSubmitting })=>{
          fetch('/api/auth/signin',{
            method: 'POST',
            body: JSON.stringify(values)
          })
          setSubmitting(false);
        }}
      >
        {({isSubmitting})=>(
          <Form className="flex flex-col justify-between items-center">
            <Field 
              name="email"
              type='email'
              placeholder="Email"
              className='bg-white'
            />
            <Field 
              name="password"
              type="password"
              placeholder="Password"
              className='bg-white'
            />
            <button
              type="submit"
              className="bg-primary-green text-white py-2 rounded hover:bg-primary-blue transition-colors cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </Form>
        )}

      </Formik>
      <p className="text-center text-sm text-primary-blue">
        Don&apos;t have an account? <Link href="/auth/signup">Sign up</Link>
      </p>
      <button
        onClick={handleGitHubSignIn}
        className="group relative w-fit flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-primary-green hover:bg-black border border-primary-green cursor-pointer"
      >
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
        </svg>
        Sign in with GitHub
      </button>
    </div>
  );
} 