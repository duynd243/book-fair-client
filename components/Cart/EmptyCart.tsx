import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import EmptyCartImage from '../../assets/images/Cart/empty-cart-gif.gif';

const EmptyCart: React.FC = () => {
    return (
        <div className={'flex flex-col items-center'}>
            <Image
                width={450}
                height={300}
                src={EmptyCartImage.src}
                alt={'empty cart'}
            />
            <p className={'text-base'}>Giỏ hàng của bạn đang trống</p>
            <Link
                className={
                    'mt-4 mb-3 flex items-center rounded-md bg-indigo-600 py-2.5 px-5 text-white transition duration-300 hover:bg-indigo-500'
                }
                href="/"
            >
                Tiếp tục mua sắm
            </Link>
        </div>
    );
};

export default EmptyCart;
