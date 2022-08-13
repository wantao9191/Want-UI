import { computed, defineComponent, inject } from "vue";
import { Icon } from "../Icon";
import t from './checkBox.module.scss'

export const CheckBox = defineComponent({
    components: { wantIcon: Icon },
    props: { value: { type: [String, Number, Boolean] }, disabled: Boolean },
    emits: ['update:value'],
    setup(props, { slots, emit }) {
        const modelValue: any = inject('checkbox:modelValue', '')
        const updateValue: any = inject('checkbox:updateValue', null)
        const disabled: any = inject('checkbox:disabled', {})
        const isChecked = computed(() => {
            return modelValue.value ? modelValue.value.includes(props.value) : props.value
        })
        const click = () => {
            if (disabled.value || props.disabled) return
            updateValue?.(props.value) ?? emit('update:value', !props.value)
        }
        return () => (
            <div class={[t['want-checkbox'], disabled.value || props.disabled ? t['want-checkbox-disabled'] : '']}>
                <span onClick={click}>
                    <want-icon class={[t.icon, isChecked.value ? t['want-checkbox-checked'] : '']} name={isChecked.value ? 'check-square' : 'border'} />
                    {slots.default?.()}
                </span>
            </div>
        )
    }
})   