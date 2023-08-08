import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { onLoginModalClose, onLoginModalOpen } from '@/slices/loginModalSlice';
import { onRegisterModalClose } from '@/slices/RegisterModalSlice';
import axios from 'axios';

const RegisterModal = () => {
    const dispatch = useDispatch()
    const { isLoginModalOpen } = useSelector((state: RootState) => state.loginModal)
    const { isRegisterModalOpen } = useSelector((state: RootState) => state.registerModal)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return
        }

        dispatch(onRegisterModalClose())
        dispatch(onLoginModalOpen())
    }, [isLoading, dispatch])

    const onSubmit = useCallback(async () => {
        const object = {
            email,
            password,
            name,
            username,
        }
        const headers = {
            'Content-Type': 'application/json'
        };
        
        try {
            console.log(object);
            setIsLoading(true)
            const res = await axios.post("http://127.0.0.1:5000/register", JSON.stringify(object), { headers })
            console.log(res.data);
            dispatch(onRegisterModalClose());
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }, [dispatch, email, name, password, username])

    const handleClose = useCallback(() => {
        dispatch(onRegisterModalClose())
    }, [dispatch])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
            type='email'
             placeholder='Email'
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             disabled={isLoading}
            />
            <Input 
             placeholder='Name'
             onChange={(e) => setName(e.target.value)}
             value={name}
             disabled={isLoading}
            />
            <Input 
             placeholder='Username'
             onChange={(e) => setUsername(e.target.value)}
             value={username}
             disabled={isLoading}
            />
            <Input 
             placeholder='Password'
             onChange={(e) => setPassword(e.target.value)}
             value={password}
             type='password'
             disabled={isLoading}
            />

        </div>
    )

    const footerContent = (
        <div className='text-neutral-400 text-center mt-4'>
            <p>Already have an account?
                <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>
                    Sign in
                </span>
            </p>
        </div>
    )
  return (
    <Modal
        disabled={isLoading}
        isOpen={isRegisterModalOpen}
        title='Create an account'
        actionLabel='Register'
        onClose={handleClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModal