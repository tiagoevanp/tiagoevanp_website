import { GroupItem, SidebarGroup } from '../SidebarProvider';
import ItemsList from './ItemsList';

class GroupsList {
    private groups: SidebarGroup = {
        'HTML & CSS': [],
        'Javascript & Typescript': [],
        'React': [],
    };

    get all() {
        return this.groups;
    }

    setItem(group: keyof SidebarGroup, item?: GroupItem) {
        if (item) {
            this.groups[group].push(item);
        }
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

groupsList.setItem('HTML & CSS', ItemsList.getItem('semantic'));
groupsList.setItem('HTML & CSS', ItemsList.getItem('aria'));
groupsList.setItem('HTML & CSS', ItemsList.getItem('modern-layouts'));
groupsList.setItem('HTML & CSS', ItemsList.getItem('animations-transitions'));
groupsList.setItem('HTML & CSS', ItemsList.getItem('sass'));
groupsList.setItem('HTML & CSS', ItemsList.getItem('css-in-js'));
groupsList.setItem('Javascript & Typescript', ItemsList.getItem('es6'));
groupsList.setItem('Javascript & Typescript', ItemsList.getItem('async'));
groupsList.setItem('Javascript & Typescript', ItemsList.getItem('web-apis'));
groupsList.setItem('React', ItemsList.getItem('lifecycle'));
groupsList.setItem('React', ItemsList.getItem('state-management'));

export default groupsList;
