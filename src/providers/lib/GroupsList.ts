import { GroupItem, SidebarGroup } from '../SidebarProvider';
import ItemsList from './ItemsList';

class GroupsList {
    private groups: SidebarGroup = {
        'HTML & CSS': [],
        'Javascript & Typescript': [],
        'React': [],
        'Outro': [],
    };

    get all() {
        return this.groups;
    }

    setItem(group: keyof SidebarGroup, item?: GroupItem) {
        if (item) {
            this.groups[group].push(item);
        }
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
groupsList.setItem('Outro', ItemsList.getItem('lifecycle'));

export default groupsList;
