'use client'
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '@/store/slices/authSlice';
import { RootState } from '@/store/store';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const isAuthInRedux = useSelector((state: RootState) => state.auth.isAuthenticated);


  useEffect(() => {

    if (status === 'authenticated' && session?.user && !isAuthInRedux) {
      dispatch(
        setAuth({
          user: {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            role: session.user.role,
          },
          activeCompany: session.user.activeCompany.id,
          permissions: session.user.permissions,
        })
      );
    }
  }, [session, status, dispatch, isAuthInRedux]);

  return <>{children}</>;
}