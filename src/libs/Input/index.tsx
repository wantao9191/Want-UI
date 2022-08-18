import { computed, defineComponent } from 'vue'
import t from './index.module.scss'
export const Input = defineComponent({
    props: {
        value: [String, Number],
        label: String,
        placeholder: String,
        readonly: Boolean,
        disabled: Boolean,
        clearable: Boolean,
        rightIcon: String,
        showWordLimit: Boolean,
        align: { type: String, default: 'left' },
        maxlength: { type: [String, Number] }
    },
    emits: ['update:value', 'clear', 'blur', 'focus'],
    setup(props, { slots, emit }) {
        const update = (e: any) => {
            emit('update:value', e.target.value)
        }
        const value = computed(() => props.value?.slice(0, props.maxlength))
        const clear = () => {
            emit('update:value', '')
            emit('clear')
        }
        const blur = (e: any) => {
            emit('blur', e)
        }
        const focus = (e: any) => {
            emit('focus', e)
        }
        return () => (
            <div class={[t['want-input'], t[`want-input-align-${props.align}`], props.disabled ? t['want-disabled-input'] : '']}>
                <div class={t['want-input-wrap']}>
                    <span class={t['want-input-label']}>{slots.label?.() ?? props.label}</span>
                    <input
                        value={value.value}
                        onInput={update}
                        onBlur={blur}
                        onFocus={focus}
                        readonly={props.readonly}
                        disabled={props.disabled}
                        maxlength={props.maxlength}
                        placeholder={props.placeholder}></input>
                    {props.clearable && value.value ? <want-icon name='close-circle' class={t['clearable']} onClick={clear}></want-icon> : ''}
                    <span class={t['want-input-right-icon']}>{slots.rightIcon?.() ?? <want-icon name={props.rightIcon}></want-icon>}</span>
                    <span class={t['want-input-button']} v-show={slots.button}>
                        {slots.button?.()}
                    </span>
                </div>

                {props.showWordLimit ? <div class={t['want-input-limit']}>{value.value.length}</div> : ''}
            </div>
        )

    }
})