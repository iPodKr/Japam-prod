'use client'

import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Container } from './container';
import Image from 'next/image';
import Link from 'next/link';
import { SearchInput } from './searchInput';
import { CartButton } from './cartButton';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { ProfileButton } from './profileButton';
import { AuthModal } from './modals';


interface Props {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
    const [openAuthModal, setOpenAuthModal] = React.useState(false);
    const searchParams = useSearchParams();
    const router = useRouter()

    React.useEffect(() => {
        let toastMessage = '';
        if (searchParams.has('paid')) {
            toastMessage = 'Заказ успешно оплачен'
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Почта успешно подтверждена'
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/')
                toast.success(toastMessage, {
                    duration: 3000,
                })
            }, 1000)
        }
    }, [])
    return (
        <header className={cn(' border-b', className)}>

            <Container className='flex items-center justify-between py-8'>
                {/*левая часть */}
                <Link href='/'>
                    <div className='flex items-center gap-4'>
                        <Image src='/logo.png' alt='Logo' width={60} height={60} />
                        <div>
                            <h1 className='text-2xl uppercase font-black'>Japan-Market</h1>
                            <p className='text-sm text-gray-400 leading-3'>Товары из японии</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (<div className='mx-10 flex-1'>
                    <SearchInput />
                </div>
                )}

                {/*правая часть*/}
                <div className='flex items-center gap-3'>
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

                    {hasCart && (<CartButton />)}
                </div>
            </Container>
        </header>
    );
};