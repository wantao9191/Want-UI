import { computed, defineComponent, provide } from "vue";
import t from './checkBoxGroup.module.scss'
export const CheckBoxGroup = defineComponent({
    props: { value: { type: Array, default: [] }, disabled: Boolean },
    emits: ['change','update:value'],
    setup(props, { slots, emit }) {
        provide('checkbox:modelValue', computed(() => props.value))
        provide('checkbox:disabled', computed(() => props.disabled))
        provide('checkbox:updateValue', (models: any) => {
            const values = props.value
            const index = values.indexOf(models)
            index > -1 ? values.splice(index, 1) : values.push(models)
            emit('change', [...values])
            emit('update:value',values)
        })
        return () => (
            <div class={t['want-checkbox-group']}>
                {slots.default?.()}
            </div>
        )
    }
})