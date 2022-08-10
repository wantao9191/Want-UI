import { defineComponent } from 'vue'
import t from './index.module.scss'
export const Noticebar = defineComponent({
    setup(props, context) {
        const slots = {
            default:()=>(<span>123</span>)
        }
        return () => (<div class={t['want-noticebar']} v-slots={slots}>
        </div>)
    }
})