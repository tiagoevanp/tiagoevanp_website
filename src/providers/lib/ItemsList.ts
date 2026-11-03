import { GroupItem } from '../SidebarProvider';

class ItemsList {
    private items: GroupItem[];

    // `sections` counts the article's h2s, or 1 when it has none; its card shows it with `liveExample`.
    // Keep both in step with the articles
    constructor() {
        this.items = [
            {
                id: 'semantic',
                title: 'semantic',
                href: 'semantic',
                sections: 1,
            },
            {
                id: 'aria',
                title: 'aria',
                href: 'aria',
                sections: 1,
            },
            {
                id: 'modern-layouts',
                title: 'modern_layouts',
                href: 'modern-layouts',
                sections: 3,
                liveExample: true,
            },
            {
                id: 'animations-transitions',
                title: 'animations_and_transitions',
                href: 'animations-transitions',
                sections: 5,
                liveExample: true,
            },
            {
                id: 'sass',
                title: 'sass',
                href: 'sass',
                sections: 6,
            },
            {
                id: 'css-in-js',
                title: 'css_in_js',
                href: 'css-in-js',
                sections: 1,
            },
            {
                id: 'es6',
                title: 'es6_plus',
                href: 'es6-plus',
                sections: 12,
            },
            {
                id: 'async',
                title: 'asynchronism',
                href: 'async',
                sections: 2,
            },
            {
                id: 'web-apis',
                title: 'web_apis',
                href: 'web-apis',
                sections: 3,
            },
            {
                id: 'lifecycle',
                title: 'lifecycle',
                href: 'lifecycle',
                sections: 2,
            },
            {
                id: 'state-management',
                title: 'state_management',
                href: 'state-management',
                sections: 2,
                liveExample: true,
            },
        ];
    }

    getItem(value: string) {
        return this.items.find((item) => item.id === value);
    }
}

const items = new ItemsList();

export default items;
