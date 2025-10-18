import { GroupItem } from '../SidebarProvider';

class ItemsList {
    private items: GroupItem[];

    constructor() {
        this.items = [
            {
                id: 'semantic',
                title: 'Semântica',
                href: 'semantic',
            },
            {
                id: 'aria',
                title: 'ARIA',
                href: 'aria',
            },
            {
                id: 'es6',
                title: 'ES6+',
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
