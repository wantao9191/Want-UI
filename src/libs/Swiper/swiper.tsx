import { computed, defineComponent, ref } from "vue";
import t from './swiper.module.scss'
export const Swiper = defineComponent({
    props: {},
    emit: {},
    setup(props, { slots, emit }) {
        const swiperWrap: any = ref('')
        const page = ref(0)
        const trans = ref(0)
        const moveX = ref(0)
        const touching = ref(false)
        let startX = 0
        const delay = 40
        const wrapWidth = computed(() => {
            const width = swiperWrap.value?.clientWidth ?? 0
            return width
        })
        const dots: any = computed(() => {
            return slots.default?.().length
        })
        const transMoveX = computed(() => {
            return page.value * wrapWidth.value
        })
        const touchstart = (e: TouchEvent) => {
            touching.value = true
            startX = e.touches[0].pageX
            console.log((dots.value - 1) * wrapWidth.value, '----')
        }
        const touchmove = (e: TouchEvent) => {
            e.preventDefault();
            const movePageX = e.touches[0].pageX - startX + trans.value
            if (Math.abs(movePageX) > (dots.value - 1) * wrapWidth.value) {
                moveX.value = -(dots.value - 1) * wrapWidth.value - delay
            } else if (movePageX > 0) {
                moveX.value = delay
            } else {
                moveX.value = movePageX
            }
        }
        const touchend = (e: TouchEvent) => {
            const index = Math.round(moveX.value / wrapWidth.value)
            page.value = index
            moveX.value = page.value * wrapWidth.value
            trans.value = moveX.value
            emit('update:value', index)
            touching.value = false
        }
        return () => (<div class={t['want-swiper']} ref={swiperWrap}>
            <div class={t['want-swiper-wrap']}
                onTouchstart={touchstart}
                onTouchmove={touchmove}
                onTouchend={touchend}
                style={{ transform: `translateX(${touching.value ? moveX.value : transMoveX.value}px)` }}>
                {slots.default?.()}
            </div>
        </div>)
    }
})