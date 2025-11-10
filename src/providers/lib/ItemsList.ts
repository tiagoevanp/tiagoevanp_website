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
                id: 'modern-layouts',
                title: 'modern_layouts',
                href: 'modern-layouts',
            },
            {
                id: 'animations-transitions',
                title: 'animations_and_transitions',
                href: 'animations-transitions',
            },
            {
                id: 'sass',
                title: 'sass',
                href: 'sass',
            },
            {
                id: 'css-in-js',
                title: 'css_in_js',
                href: 'css-in-js',
            },
            {
                id: 'es6',
                title: 'es6_plus',
                href: 'es6-plus',
            },
            {
                id: 'async',
                title: 'asynchronism',
                href: 'async',
            },
            {
                id: 'web-apis',
                title: 'web_apis',
                href: 'web-apis',
            },
            {
                id: 'lifecycle',
                title: 'lifecycle',
                href: 'lifecycle',
            },
            {
                id: 'state-management',
                title: 'state_management',
                href: 'state-management',
            },
        ];
    }

    getItem(value: string) {
        return this.items.find((item) => item.id === value);
    }
}

const items = new ItemsList();

export default items;
