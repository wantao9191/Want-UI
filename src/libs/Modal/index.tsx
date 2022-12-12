import { defineComponent, withModifiers } from "vue";
import t from './index.module.scss'
export const Modal = defineComponent({
    props: {
        visible: Boolean, title: String,
        align: { type: String, default: 'center' },
        closeOnMaskClick: Boolean
    },
    emits: ['update:visible'],
    setup(props, { slots, emit }) {
        const click = () => {
            if (props.closeOnMaskClick) emit('update:visible', false)
        }
        return () => (<>
            {props.visible ? <div class={t['want-modal']} onClick={click}>
                <div class={[t['want-modal-wrap'], t[`want-modal-${props.align}`]]} onClick={withModifiers(() => { }, ['stop'])}>
                    <header>{slots.title?.() ?? props.title}</header>
                    <main>{slots.default?.()}</main>
                    {slots.footer ? <footer>{slots.footer()}</footer> : ''}
                </div>
            </div> : ''}
        </>)
    }
})