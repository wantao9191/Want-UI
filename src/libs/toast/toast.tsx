import { defineComponent } from 'vue'
import t from './toast.module.scss'
export const toast = defineComponent({
    props: { text: { type: String, default: '' }, mask: { type: Boolean, default: false }, top: { type: String, default: '' } },
    setup(props, context) {
        return () => (<div class={t.toast} style={{ top: props.top }}>{props.text}</div>)
    }
})