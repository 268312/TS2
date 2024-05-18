import {Button, TextField} from '@mui/material';
import './LoginForm.css'
import LoginIcon from '@mui/icons-material/Login'
import {Formik} from "formik";
import {useCallback, useMemo} from "react";
import * as yup from 'yup';


function LoginForm() {
    const initialValues = { username: '', password: '', rememberMe: false};
    const onSubmit = useCallback((values: {username: String; password: String}, formik: any) => {console.log(values);}, []);

    const validationSchema = useMemo(() => yup.object().shape({
        username: yup.string().required('Required'),
        password: yup.string().required('Required').min(8, 'Must be 8 characters')})
    , [])
    return(
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
                    startIcon={<LoginIcon/>}
                    type="submit"
                    form="signForm"
                    disabled={
                        !(formik.isValid && formik.dirty) ||
                        !formik.touched.password ||
                        !formik.touched.username
                    }
                    color = "primary">
                    Log in
                </Button>
            </form>)}
        </Formik>
    );
}

export default LoginForm;