import { computed, defineComponent, nextTick, onMounted, onUpdated, ref } from "vue";
import t from './swiper.module.scss'
export const Swiper = defineComponent({
    props: {
        activeIndex: { type: Number, default: 0 },
        duration: { type: Number, default: 2000 },
        autopaly: Boolean,
        loop: Boolean,
        dotOutside:Boolean
    },
    emits: ['update:value'],
    setup(props, { slots, emit }) {
        const swiperWrap: any = ref('')
        const animation = ref(false)
        const page = ref(props.loop ? -props.activeIndex - 1 : -props.activeIndex)
        const moveX = ref(0)
        const touching = ref(false)
        let startX = 0
        let timer: any = null
        const delay = 40
        const wrapWidth = computed(() => {
            const width = swiperWrap.value?.clientWidth ?? 0
            return width
        })
        const dots: any = computed(() => {
            const length = slots.default?.().length ?? 0
            return Array.from(new Array(length).keys())
        })
        const transMoveX = computed(() => {
            return page.value * wrapWidth.value
        })
        const activePage = computed(() => {
            return props.loop ? Math.abs(page.value) - 1 : Math.abs(page.value)
        })
        const touchstart = (e: TouchEvent) => {
            touching.value = true
            animation.value = true
            startX = e.touches[0].pageX
            moveX.value = transMoveX.value
        }
        const touchmove = (e: TouchEvent) => {
            e.preventDefault();
            const movePageX = e.touches[0].pageX - startX + transMoveX.value
            const length = props.loop ? dots.value.length + 1 : dots.value.length - 1
            if (Math.abs(movePageX) > (length) * wrapWidth.value) {
                moveX.value = -(length) * wrapWidth.value - delay
            } else if (movePageX > 0) {
                moveX.value = delay
            } else {
                moveX.value = movePageX
            }
        }
        const touchend = (e: TouchEvent) => {
            const index = Math.round(moveX.value / wrapWidth.value)
            resolveMoveEnd(index)
        }
        const resolveMoveEnd = (index: number) => {
            if (props.loop) {
                if (Math.abs(index) > dots.value.length) {
                    page.value = index
                    setTimeout(() => {
                        animation.value = false
                        page.value = index + dots.value.length
                    }, 200);
                } else if (Math.abs(index) === 0) {
                    page.value = index
                    setTimeout(() => {
                        animation.value = false
                        page.value = -dots.value.length
                    }, 200);
                } else {
                    page.value = index
                }
            } else {
                page.value = index
            }
            moveX.value = page.value * wrapWidth.value
            emit('update:value', index)
            touching.value = false
            setTimeout(() => {
                animation.value = false
                if (props.autopaly) {
                    clearInterval(timer)
                    timer = null
                    initAuto()
                }
            }, 200);
        }
        const initAuto = () => {
            if (props.autopaly && !timer) {
                timer = setInterval(() => {
                    if (touching.value) {
                        clearInterval(timer)
                        return
                    }
                    animation.value = true
                    if (page.value > -(dots.value.length - 1)) {
                        resolveMoveEnd(page.value - 1)
                    } else {
                        clearInterval(timer)
                        animation.value = false
                    }
                }, props.duration)
            }
        }
        onUpdated(() => {
            initAuto()
        })
        onMounted(() => {
            if (props.loop) {
                const parentNode = swiperWrap.value.querySelector('.want-swiper-wrap')
                const items = swiperWrap.value.querySelectorAll('.want-swiper-item')
                const last = items[items.length - 1].cloneNode(true)
                const first = items[0].cloneNode(true)
                parentNode.appendChild(first)
                parentNode.insertBefore(last, items[0])

            }
        })
        return () => (<div class={t['want-swiper']}>
            <div class={t['want-swiper-main']} ref={swiperWrap}>
                <div class={[t['want-swiper-wrap'], 'want-swiper-wrap', animation.value ? t.animation : '']}
                    onTouchstart={touchstart}
                    onTouchmove={touchmove}
                    onTouchend={touchend}
                    style={{ transform: `translateX(${touching.value ? moveX.value : transMoveX.value}px)` }}>
                    {slots.default?.()}
                </div>
            </div>
            <div class={[t['want-dots-wrap'],props.dotOutside ? t['dots-outside'] : '']}>
                {dots.value.map((d: any, i: number) => {
                    return <span class={[t.dot, activePage.value === i ? t['dot-active'] : '']}></span>
                })}
            </div>
        </div>)
    }
})