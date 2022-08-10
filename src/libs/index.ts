import { Toast } from "./toast";
import { Icon } from "./Icon/index.tsx";
import { Button } from "./Button/index.jsx";
import { Noticebar } from "./Noticebar";
import { Tabs } from "./Tabs/tabs";
import { TabsPane } from "./Tabs/tabsPane";

export { Toast }
function install(Vue: any) {
    Vue.component('want-icon', Icon)
    Vue.component('want-button', Button)
    Vue.component('want-noticebar', Noticebar)
    Vue.component('want-tabs', Tabs)
    Vue.component('want-tabs-pane', TabsPane)
}
export default { install }