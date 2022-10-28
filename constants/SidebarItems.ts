import { ReactNode } from 'react';

export const ADMIN_BASE_PATH = '/admin';

export type ISidebarItem = {
    label: string;
    path?: string;
    icon?: ReactNode;
    onClick?: () => void;
    subItems?: ISidebarItem[];
};
