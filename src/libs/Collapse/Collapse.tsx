import { computed, defineComponent, provide } from 'vue'
import t from './collapse.module.scss'
export const Collapse = defineComponent({
    props: { activeKeys: {type:Array,default:[]} },
    setup(props, { slots }) {
        provide('value', computed(() => props.activeKeys))
        return () => (<div class={t['want-collapse']}>
            {slots.default?.()}
        </div>)
    }
})