import { GroupItem, SidebarGroup } from '../SidebarProvider';
import ItemsList from './ItemsList';

class GroupsList {
    // Keys of `skill_docs.groups` in the locales
    private groups: SidebarGroup = {
        html_css: [],
        javascript: [],
        react: [],
    };

    get all() {
        return this.groups;
    }

    setItem(group: keyof SidebarGroup, item?: GroupItem) {
        if (item) {
            this.groups[group].push(item);
        }
    }

    getItem(href: string) {
        return Object.values(this.groups).flat().find((item) => item.href === href);
    }

    // The docs around `href`, flattened across groups in the order the sidebar shows them
    getSiblings(href: string): { previous?: GroupItem; next?: GroupItem } {
        const items = Object.values(this.groups).flat();
        const index = items.findIndex((item) => item.href === href);

        if (index === -1) return {};

        return { previous: items[index - 1], next: items[index + 1] };
    }
}

const groupsList = new GroupsList();

groupsList.setItem('html_css', ItemsList.getItem('semantic'));
groupsList.setItem('html_css', ItemsList.getItem('aria'));
groupsList.setItem('html_css', ItemsList.getItem('modern-layouts'));
groupsList.setItem('html_css', ItemsList.getItem('animations-transitions'));
groupsList.setItem('html_css', ItemsList.getItem('sass'));
groupsList.setItem('html_css', ItemsList.getItem('css-in-js'));
groupsList.setItem('javascript', ItemsList.getItem('es6'));
groupsList.setItem('javascript', ItemsList.getItem('async'));
groupsList.setItem('javascript', ItemsList.getItem('web-apis'));
groupsList.setItem('react', ItemsList.getItem('lifecycle'));
groupsList.setItem('react', ItemsList.getItem('state-management'));

export default groupsList;
