import '../style.scss'
import { Toast } from "./toast";
import { Icon } from "./Icon/index";
import { Button } from "./Button/index.jsx";
import { Noticebar } from "./Noticebar";
import { Tabs } from "./Tabs/tabs";
import { TabsPane } from "./Tabs/tabsPane";
import { ActionSheet } from "./ActionSheet/index";
import { actionSheet } from "./ActionSheet/actionSheet";
import { dialog } from './Dailog/dialog'
import { Collapse } from "./Collapse/Collapse";
import { CollapsePane } from "./Collapse/CollapsePane";
import { Switch } from "./Switch";
import { Popup } from "./Popup";
import { CheckBox } from "./Checkbox/checkBox";
import { CheckBoxGroup } from "./Checkbox/checkBoxGrounp";
import { Radio } from "./Radio/radio";
import { RadioGroup } from "./Radio/radioGroup";
import { Modal } from "./Modal";
import { Swiper } from "./Swiper/swiper";
import { swiperItem } from "./Swiper/swiperItem";
import { Picker } from "./Picker/index";
import { Input } from "./Input";
import { SwipeAction } from "./SwipeAction";
import { Space } from "./Space";

export { Toast, actionSheet, dialog }
function install(Vue: any) {
    Vue.component('want-icon', Icon)
    Vue.component('want-button', Button)
    Vue.component('want-noticebar', Noticebar)
    Vue.component('want-tabs', Tabs)
    Vue.component('want-tabs-pane', TabsPane)
    Vue.component('want-sheet-action', ActionSheet)
    Vue.component('want-collapse', Collapse)
    Vue.component('want-collapse-pane', CollapsePane)
    Vue.component('want-switch', Switch)
    Vue.component('want-popup', Popup)
    Vue.component('want-checkbox', CheckBox)
    Vue.component('want-checkbox-group', CheckBoxGroup)
    Vue.component('want-radio', Radio)
    Vue.component('want-radio-group', RadioGroup)
    Vue.component('want-modal', Modal)
    Vue.component('want-swiper', Swiper)
    Vue.component('want-swiper-item', swiperItem)
    Vue.component('want-picker', Picker)
    Vue.component('want-input', Input)
    Vue.component('want-swipe-action', SwipeAction)
    Vue.component('want-space', Space)
}
export default { install }