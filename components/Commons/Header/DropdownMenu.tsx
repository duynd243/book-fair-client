import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAuth } from '../../../context/AuthContext';
import { ReactTag } from '@headlessui/react/dist/types';

type Props = {
    menuClasses: string;
    menuButtonClasses?: string;
    menuButtonChildren: JSX.Element;
    menuItemsObject: {
        guest: Array<JSX.Element>;
        user: Array<JSX.Element>;
    };
};

type Test = {
    wrapper: React.FC;
    children: JSX.Element;
};

const something: Test = {
    wrapper: 'div',
    children: <div>test</div>,
};

const DropdownMenu: React.FC<Props> = (props) => {
    const { user, authLoading, logOut } = useAuth();
    return (
        <Menu as={'div'} className={props.menuClasses}>
            {<something.wrapper {...something.children} />}
            <Menu.Button className={props.menuButtonClasses}>
                {props.menuButtonChildren}
            </Menu.Button>
            <Transition>
                <Menu.Items>
                    {!authLoading &&
                        !user &&
                        props.menuItemsObject.guest.map((item, index) => (
                            <Menu.Item key={index}>
                                <>
                                    <h1></h1>
                                </>
                            </Menu.Item>
                        ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default DropdownMenu;
