import Head from 'next/head';
import NextLink from 'next/link';
import Router, { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import { useContext } from 'react';
import { useAuth } from '../contexts/auth';

const Login = () => {
  const auth = useAuth()
  // const router = useRouter()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .max(255)
        .required('Username is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    // onSubmit: async (values) => {
    //   const res_2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/token`,
    //       {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: new URLSearchParams({
    //           "username": values.username,
    //           "password": values.password
    //         }).toString()
    //       }
    //     )
    //     if (res_2.status == 200){
    //       const json = res_2.json()
    //       localStorage.setItem('token', json.access_token);
    //       router.push("/dashboard");
    //     }else if(res_2.status == 401){
    //       alert("Wrong username or password")
    //     }else{
    //       alert(res_2.status)
    //     }
    // }
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <NextLink
            href="/"
            passHref
          >
            <Button
              // component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
            >
              Home
            </Button>
          </NextLink>
          <form onSubmit={auth.login}>
            <Box>
              <Typography
                color="textPrimary"
                variant="h4"
              >
                Sign in
              </Typography>
            </Box>
            
            
            <TextField
              error={Boolean(formik.touched.username && formik.errors.username)}
              fullWidth
              helperText={formik.touched.username && formik.errors.username}
              label="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
            </Box>
            <Box
              sx={{
                pb: 3,
                pt: 1
              }}
            >
              <Typography
                align="center"
                color="textSecondary"
                variant="body1"
              >
                or login with Facebook/Google
              </Typography>
            </Box>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  variant="contained"
                >
                  Login with Facebook
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
              >
                <Button
                  color="error"
                  fullWidth
                  onClick={() => formik.handleSubmit()}
                  size="large"
                  startIcon={<GoogleIcon />}
                  variant="contained"
                >
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Don't have an account?
              {' '}
              <NextLink
                href="/signup"
              >
                {/* <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: 'pointer'
                  }}
                > */}
                  Sign Up
                {/* </Link> */}
              </NextLink>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
