export type SidebarItem = {
    label: string;
    path?: string;
    onClick?: () => void;
    subItems?: SidebarItem[];
};

export const ADMIN_SIDEBAR_ITEMS: SidebarItem[] = [
    {
        label: 'Dashboard',
        path: '/admin',
    },
    {
        label: 'Users',
        path: '/admin/users',
    },
];
