import { Toast } from "./toast";
import { Icon } from "./Icon/index.tsx";
import { Button } from "./Button/index.jsx";
import { Noticebar } from "./Noticebar";
export { Toast }
function install(Vue: any) {
    Vue.component('want-icon', Icon)
    Vue.component('want-button', Button)
    Vue.component('want-noticebar', Noticebar)
}
export default { install }