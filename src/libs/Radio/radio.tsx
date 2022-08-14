import { computed, defineComponent, inject } from "vue";
import { Icon } from "../Icon";
import t from './radio.module.scss'

export const Radio = defineComponent({
    components: { wantICon: Icon },
    props: { value: { type: [Boolean, String, Number] }, disabled: Boolean },
    emits: ['update:value'],
    setup(props, { slots, emit }) {
        const value: any = inject('radio:value', '')
        const updateValue: any = inject('radio:updateValue', null)
        const disabled: any = inject('radio:disabled', false)
        const checked = computed(() => {
            return value.value != undefined ? value.value === props.value : props.value
        })
        const click = () => {
            if (disabled.value || props.disabled) return
            updateValue?.(props.value) ?? emit('update:value', !props.value)
        }
        return () => (<div class={[t['want-radio'],disabled.value || props.disabled ? t['want-radio-disabled'] : '']}>
            <span onClick={click}>
                {checked.value ? <want-icon name='check-circle' class={t.icon}></want-icon> : <i class={t.circle}></i>}
                {slots.default?.()}
            </span>
        </div>)
    }
})