import { computed, defineComponent, provide } from 'vue'
import t from './collapse.module.scss'
export const Collapse = defineComponent({
    props: { value: { type: [Array, String], default: () => [] || '' }, accordion: Boolean },
    emits: ['update:value'],
    setup(props, { slots, emit }) {
        const actives = computed(() => props.value)
        provide('collapse:value', actives)
        provide('collapse:accordion', computed(() => props.accordion))
        provide('collapse:updateValue', (name: string | number) => {
            if (props.accordion) {
                emit('update:value', name)
            } else {
                const index = props.value.indexOf(name)
                const arr:any = props.value
                index > -1 ? arr.splice(index, 1) : arr.push(name)
                emit('update:value', arr)
            }
        })
        return () => (<div class={t['want-collapse']}>
            {slots.default?.()}
        </div>)
    }
})