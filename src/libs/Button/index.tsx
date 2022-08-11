import { defineComponent, withModifiers } from 'vue'
import t from './button.module.scss'
export const Button = defineComponent({
    props: {
        type: { type: String, default: 'default' },
        size: { type: String, default: 'middle' },
        fill: { type: String, default: 'solid' },
        block: Boolean,
        disabled: Boolean,
        round: Boolean,
        loading: Boolean
    },
    setup(props, { slots, emit }) {
        const onClick = (e: any) => {
            emit('click', e)
        }
        return () => (
            <button class={[
                t['want-button'],
                t[`want-${props.type}-button`],
                t[props.size],
                t[`fill-${props.fill}`],
                props.block ? t['block-button'] : '',
                props.disabled ? t['disabled-button'] : '',
                props.round ? t['round-button'] : '',
                props.loading ? t['loading-button'] : ''
            ]} disabled={props.loading || props.disabled}>
                <i class={t.loadingIndicator}></i>
                {slots.default?.()}
            </button>)
    }
})