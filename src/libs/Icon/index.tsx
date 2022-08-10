import { defineComponent } from 'vue'
import t from './icon.module.scss'
export const Icon = defineComponent({
    props: {
        name: { type: String, default: '' }
    },
    setup(props, { slots }) {
        return () => (<i class={[t['want-icon'], `want-${props.name}`, 'iconfont']}>{slots.default?.()}</i>)
    }
})