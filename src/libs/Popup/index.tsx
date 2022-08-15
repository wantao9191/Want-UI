import { defineComponent, withModifiers, ref, nextTick } from "vue";
import t from './index.module.scss'
export const Popup = defineComponent({
    props: { position: { type: String, default: 'bottom' }, visible: { type: Boolean, default: false }, round: Boolean },
    emits: ['update:visible', 'close'],
    setup(props, { slots, emit }) {
        const fadeout = ref(false)
        const close = () => {
            if (fadeout.value) return
            fadeout.value = true
            setTimeout(() => {
                emit('update:visible', false)
                emit('close')
                fadeout.value = false
            }, 420);
        }
        const touchmove = (e: TouchEvent) => {
            e.preventDefault();
        }
        return () => (<>
            {props.visible ? <div class={t['want-popup']} onTouchmove={touchmove} onClick={close}>
                <div class={[t['want-popup-wrap'], props.round ? t['popup-round'] : '', t[`popup-${props.position}`], fadeout.value ? t.fadeout : '']} onClick={withModifiers(() => { }, ['stop'])}>
                    <main v-show={!fadeout.value}>
                        {slots.default?.()}
                    </main>
                </div>
            </div> : ''}
        </>)
    },
})