import { SidebarItem } from '../SidebarProvider';

export const groups: SidebarItem[] = [
    {
        group: 'HTML & CSS',
        items: [
            {
                id: '1',
                title: 'Semântica',
                href: 'semantic',
            },
            {
                id: '2',
                title: 'Item 2',
                href: 'item-2',
            },
        ],
    },
    {
        group: 'Group 2',
        items: [
            {
                id: '3',
                title: 'Item 3',
                href: 'item-3',
            },
        ],
    },
];
