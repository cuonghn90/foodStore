import './style.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from "formik";
import { IUserLogin } from 'interface';
import { useAppDispatch, useAppSelector } from 'store/hook';
import { userLogin } from '../AuthenSlice';

interface IProps {
    changeShowlogin: Function;
}

const Login = () => {
    // store
    const { userInfo } = useAppSelector((state) => state.authStore);
    const dispatch = useAppDispatch();

    // useNavigate
    const navigate = useNavigate();
    const redictToRegister = () => {
        navigate('/auth/register');
    };

    const redictToFotgotPassword = () => {
        navigate('/auth/forgot-password');
    };

    // Function
    const handleLoginIn = async (values: IUserLogin) => {
        const userModel: IUserLogin = {
            email: values.email,
            password: values.password,
        };
        await dispatch(userLogin(userModel));
    };

    // useEffect
    useEffect(() => {
        if (userInfo.userId) {
            navigate('/');
        }
    }, [userInfo]);
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Email không đúng định dạng').required("Vui lòng nhập email"),
                password: Yup.string().min(5, 'Mật khẩu yếu').max(20, 'Vui lòng nhập dưới 20 kí tự').required('Vui lòng nhập mật khẩu'),
            })}
            onSubmit={values => {
                handleLoginIn(values);
            }}>
            {formik => (
                <form className='form-login' onSubmit={formik.handleSubmit}>
                    <div className='login'>
                        <h2>Đồ ăn Việt</h2>
                        <div className="inputBox">
                            <input type="text" placeholder='email' {...formik.getFieldProps('email')} name='email' />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-error">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="inputBox">
                            <input type="password" placeholder='Mật khẩu' {...formik.getFieldProps('password')} name='password' />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-error">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className="inputBox">
                            <input type="submit" value='Đăng nhập' id='btn' name='btnLogin' />
                        </div>
                        <div className="group">
                            <button name='btnRedictForgotPassword' onClick={redictToFotgotPassword}>Quên mật khẩu</button>
                            <button name='btnRedictRegister' onClick={redictToRegister}>Đăng kí</button>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
};
export default Login;