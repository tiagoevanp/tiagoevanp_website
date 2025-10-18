import { GroupItem, SidebarGroup } from '../SidebarProvider';
import ItemsList from './ItemsList';

class GroupsList {
    private groups: SidebarGroup = {
        'HTML & CSS': [],
        'Javascript & Typescript': [],
    };

    get all() {
        return this.groups;
    }

    setItem(group: string, item?: GroupItem) {
        if (item) {
            this.groups[group].push(item);
        }
    }
}

const groupsList = new GroupsList();

groupsList.setItem('HTML & CSS', ItemsList.getItem('semantic'));
groupsList.setItem('HTML & CSS', ItemsList.getItem('aria'));
groupsList.setItem('Javascript & Typescript', ItemsList.getItem('es6'));

export default groupsList;
