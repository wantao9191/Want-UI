import { Toast } from "./toast";
import { Icon } from "./Icon/index";
import { Button } from "./Button/index.jsx";
import { Noticebar } from "./Noticebar";
import { Tabs } from "./Tabs/tabs";
import { TabsPane } from "./Tabs/tabsPane";
import { ActionSheet } from "./ActionSheet/index";
import { actionSheet } from "./ActionSheet/actionSheet";
import { dialog } from './Dailog/dialog'
export { Toast, actionSheet, dialog }
function install(Vue: any) {
    Vue.component('want-icon', Icon)
    Vue.component('want-button', Button)
    Vue.component('want-noticebar', Noticebar)
    Vue.component('want-tabs', Tabs)
    Vue.component('want-tabs-pane', TabsPane)
    Vue.component('want-sheet-action', ActionSheet)
}
export default { install }