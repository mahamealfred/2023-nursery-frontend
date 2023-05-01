import React from 'react'
import "./login.scss"
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import {Link,Container, Typography, Divider, Stack, Button } from '@mui/material';
// hooks
import useResponsive from "../../hooks/useResponsive"
// components
// import Logo from '../components/logo';
// import Iconify from '../components/iconify';
// // sections
// import { LoginForm } from '../sections/auth/login';
import LoginForm from '../../components/form/LoginForm';
import IMAGES from "../../Assets/images";
// import { Link } from 'react-router-dom';
import Registration from '../registration/Registration';

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));
  
  const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));
  
  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));
  
const Login = () => {
  const mdUp = useResponsive('up', 'md');
  return (
    <div>
    <Helmet>
    <title> Login</title>
  </Helmet>
  <StyledRoot>
  {mdUp && (
    <StyledSection className='sectionform'>
    <img src={IMAGES.logo} alt="" className='avantare'/>
      <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
        Hi, Welcome Back
      </Typography>
      <img src="/assets/illustrations/illustration_login.png" alt="login" />
    </StyledSection>
  )}

  <Container maxWidth="sm">
    <StyledContent>
      <Typography variant="h4" gutterBottom>
       Sign in 
      </Typography>
      <Typography variant="body2" sx={{ mb: 5 }}>
       Don’t have an account? {''}
  <Link href='Registration' variant="subtitle2">Sign up</Link>
  </Typography>
<LoginForm/>
    </StyledContent>
  </Container>
</StyledRoot>

    </div>
  )
}

export default Login