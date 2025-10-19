import { GroupItem } from '../SidebarProvider';

class ItemsList {
    private items: GroupItem[];

    constructor() {
        this.items = [
            {
                id: 'semantic',
                title: 'semantic',
                href: 'semantic',
            },
            {
                id: 'aria',
                title: 'aria',
                href: 'aria',
            },
            {
                id: 'es6',
                title: 'es6-plus',
                href: 'es6-plus',
            },
        ];
    }

    getItem(value: string) {
        return this.items.find((item) => item.id === value);
    }
}

const items = new ItemsList();

export default items;
