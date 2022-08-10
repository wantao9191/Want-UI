import { defineComponent } from 'vue'
import t from './index.module.scss'
export const Noticebar = defineComponent({
    props: {
        content: String,
        closeable: Boolean,
        type: { type: String, default: 'default' },
        icon: { type: String, default: 'sound' },
        
    },
    setup(props, { slots, emit }) {
        const close = () => {
            emit('close')
        }
        return () => (<div class={[t['want-noticebar'], t[`want-noticebar-${props.type}`]]}>
            <span class={t['want-noticebar-left']}><want-icon name={props.icon} class={t['prefix']}></want-icon>{slots.default?.() ?? props.content}</span>
            <span class={t['want-noticebar-right']}>
                {slots.right?.() ?? <want-icon name='close' class={t['notice-close']} v-show={props.closeable} onClick={() => close()} />}
            </span>
        </div>)
    }
})