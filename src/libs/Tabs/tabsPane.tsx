import { defineComponent, inject } from 'vue'
import t from './pane.module.scss'
export const TabsPane = defineComponent({
    props: {
        label: { type: [String, Number] },
        name: { type: [String, Number] },
        disabled: Boolean
    },
    setup(props, { slots }) {
        const value: any = inject('tabs:value')
        return () => (<div class={t['want-tabs-pane']} v-show={value?.value === props.name && !props.disabled}>{slots.default?.()}</div>)
    }
})