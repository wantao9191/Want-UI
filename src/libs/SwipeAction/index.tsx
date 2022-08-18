import { computed, defineComponent, onMounted, ref } from 'vue'
import t from './index.module.scss'
export const SwipeAction = defineComponent({
    props: {},
    emits: [],
    setup(props, { slots, emit }) {
        const wrap = ref('')
        const left: any = ref('')
        const right: any = ref('')
        const animation = ref(false)
        let start = 0
        let trans = 0
        const moveY = ref(0)
        const wrapRect: any = computed(() => {
            return { initLeft: left.value.clientWidth }
        })
        const touchstart = (e: TouchEvent) => {
            animation.value = true
            start = e.touches[0].pageX
            moveY.value = -wrapRect.value.initLeft
        }
        const touchmove = (e: TouchEvent) => {
            e.preventDefault();
            moveY.value = e.touches[0].pageX - start + trans
        }
        const touchend = (e: TouchEvent) => {
            trans = moveY.value
            animation.value = false
        }
        return () => (
            <div class={t['want-swipe-action']}

                ref={wrap}
                onTouchstart={touchstart}
                onTouchmove={touchmove}
                onTouchend={touchend}>
                <div
                    class={[t["want-swipe-wrap"], animation.value ? t.animation : '']}
                    style={{ transform: `translateX(${animation.value ? moveY.value : -wrapRect.value.initLeft}px)` }}>
                    <div class={t['want-swipe-left']} ref={left}>{slots.leftActions?.()}</div>
                    <div class={t['want-swipe-action-main']}>{slots.default?.()}</div>
                    <div class={t['want-swipe-left']} ref={right}>{slots.rightActions?.()}</div>
                </div>
            </div>)
    }
})