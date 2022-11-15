import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EmptyCartImage from '../../assets/images/cart/empty-cart.gif';

const EmptyCart: React.FC = () => {
    return (
        <div className={'tw-flex tw-flex-col tw-items-center'}>
            <Image
                width={450}
                height={300}
                src={EmptyCartImage.src}
                alt={'empty cart'}
            />
            <p className={'tw-text-base'}>Giỏ hàng của bạn đang trống</p>
            <Link
                className={
                    'tw-mt-4 tw-mb-3 tw-flex tw-items-center tw-rounded-md tw-bg-indigo-600 tw-py-2.5 tw-px-5 tw-text-white tw-transition tw-duration-300 hover:tw-bg-indigo-500'
                }
                href="/"
            >
                Tiếp tục mua sắm
            </Link>
        </div>
    );
};

export default EmptyCart;
