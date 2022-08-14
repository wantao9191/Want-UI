import { defineComponent, provide, computed } from "vue";
import t from './radio.module.scss'
export const RadioGroup = defineComponent({
    props: { value: { type: [String, Number] }, disabled: Boolean },
    emits: ['change', 'update:value'],
    setup(props, { slots, emit }) {
        provide('radio:value', computed(() => props.value))
        provide('radio:disabled', computed(() => props.disabled))
        provide('radio:updateValue', (models: any) => {
            emit('change', models)
            emit('update:value', models)
        })
        return () => (<div class={[t['want-radio']]}>{slots.default?.()}</div>)
    }
})