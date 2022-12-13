import { computed, defineComponent, nextTick, onMounted, ref, withModifiers } from 'vue'
import t from './index.module.scss'
export const SwipeAction = defineComponent({
    props: { beforeClose: Function },
    emits: [],
    setup(props, { slots, emit }) {
        const wrap = ref('')
        const left: any = ref('')
        const right: any = ref('')
        const animation = ref(false)
        let start = 0
        let moving = false
        const moveY = ref(0)
        const wrapRect: any = computed(() => {
            moveY.value = -left.value.clientWidth
            return { initLeft: left.value.clientWidth }
        })
        const touchstart = (e: TouchEvent) => {
            animation.value = true
            if (moveY.value === -left.value.clientWidth) {
                start = e.touches[0].pageX + wrapRect.value.initLeft
                moveY.value = -wrapRect.value.initLeft
            } else if (-(right.value.clientWidth + left.value.clientWidth) === moveY.value) {
                start = e.touches[0].pageX - moveY.value
            }

        }
        const touchmove = (e: TouchEvent) => {
            e.preventDefault();
            moving = true
            let trans = e.touches[0].pageX - start
            if (trans + wrapRect.value.initLeft > left.value.clientWidth) {
                moveY.value = 0
            } else if (Math.abs(trans + left.value.clientWidth) > right.value.clientWidth) {
                moveY.value = -(right.value.clientWidth + left.value.clientWidth)
            } else {
                moveY.value = trans
            }
        }
        const touchend = (e: TouchEvent) => {
            if (moveY.value + wrapRect.value.initLeft > left.value.clientWidth / 2) {
                moveY.value = 0
            } else if (Math.abs(moveY.value + left.value.clientWidth) > right.value.clientWidth / 2) {
                moveY.value = -(right.value.clientWidth + left.value.clientWidth)
            } else {
                moveY.value = -left.value.clientWidth
                animation.value = false
            }
            if (!moving) {
                moveY.value = -left.value.clientWidth
            }
            moving = false
        }
        const reset = () => {
            props.beforeClose?.(() => { moveY.value = -wrapRect.value.initLeft })
            if (!props.beforeClose) moveY.value = -wrapRect.value.initLeft
        }
        return () => (
            <div class={t['want-swipe-action']} ref={wrap}>
                <div
                    class={[t["want-swipe-wrap"], animation.value ? t.animation : '']}
                    style={{ transform: `translateX(${animation.value ? moveY.value : -wrapRect.value.initLeft}px)` }}>
                    <div class={t['want-swipe-left']} ref={left} onClick={reset}>{slots.leftActions?.()}</div>
                    <div
                        class={t['want-swipe-action-main']}
                        onTouchstart={touchstart}
                        onTouchmove={touchmove}
                        onTouchend={touchend}>
                        {slots.default?.()}
                    </div>
                    <div class={t['want-swipe-left']} ref={right} onClick={reset}>{slots.rightActions?.()}</div>
                </div>
            </div>)
    }
})