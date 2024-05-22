import {AppBar, Button, TextField, Toolbar} from '@mui/material';
import './LoginForm.css'
import LoginIcon from '@mui/icons-material/Login'
import {Formik} from "formik";
import React, {useCallback, useMemo} from "react";
import * as yup from 'yup';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";


function LoginForm() {
    const navigate = useNavigate();
    const initialValues = { username: '', password: '', rememberMe: false};
    const onSubmit = useCallback(
        (values: {username: String; password: String}, formik: any) => {
            navigate('/home');}, [navigate]);

    const validationSchema = useMemo(() => yup.object().shape({
        username: yup.string().required('Required'),
        password: yup.string().required('Required').min(8, 'Must be 8 characters')})
    , [])
    return(
        <div>
        <AppBar position="static" sx={{ backgroundColor: '#E08D96' }}>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            marginLeft: 5
                        }}
                    >
                        Library
                    </Typography>
            </Toolbar>
        </AppBar>
        <Formik initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnChange validateOnBlur>
            {(formik: any) => (<form className="Login-form" id="signForm" onSubmit={formik.handleSubmit} noValidate>
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    name='username'
                    onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                    error={formik.touched.username && !!(formik.errors.username)}
                    helperText = {formik.touched.username && formik.errors.username}/>
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name='password'
                    onChange={formik.handleChange}
                    onBlur = {formik.handleBlur}
                    error={formik.touched.password && !!(formik.errors.password)}
                    helperText = {formik.touched.password && formik.errors.password}/>
                <Button
                    variant="text"
                    startIcon={<LoginIcon />}
                    type="submit"
                    form="signForm"
                    disabled={
                        !(formik.isValid && formik.dirty) ||
                        !formik.touched.password ||
                        !formik.touched.username
                    }
                    sx={{ color: '#F59AA5' }} // custom text color
                >
                    Log in
                </Button>
            </form>)}
        </Formik>
        </div>
    );
}

export default LoginForm;