import React, { useCallback, useState } from 'react'
import Input from '../Input';
import Modal from '../Modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { onLoginModalClose } from '@/slices/loginModalSlice';

const LoginModal = () => {
    const isLoginModalOpen = useSelector((state:RootState) => state.loginModal.isLoginModalOpen);
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            dispatch(onLoginModalClose)

        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
        }
    }, [dispatch])

    const handleClose = useCallback(() => {
        dispatch(onLoginModalClose())
    }, [dispatch])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input 
             placeholder='Email'
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             disabled={isLoading}
            />
                        <Input 
             placeholder='Password'
             type='password'
             onChange={(e) => setPassword(e.target.value)}
             value={password}
             disabled={isLoading}
            />

        </div>
    )
  return (
    <Modal
        disabled={isLoading}
        isOpen={isLoginModalOpen}
        title='Login'
        actionLabel='Sign In'
        onClose={handleClose}
        onSubmit={onSubmit}
        body={bodyContent}
    />
  )
}

export default LoginModal