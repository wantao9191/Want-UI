import { defineComponent, ref, computed, nextTick } from 'vue'
import t from './pickerItem.module.scss'
export const PickerItem = defineComponent({
    props: { columns: { type: Array, default: [] }, value: { type: [String, Number, Object] } },
    emits: ['update:value'],
    setup(props, { emit }) {
        const $main: any = ref('')
        let startY = 0
        let transY = 0
        const moveY = ref(0)
        const selectBoxTrans = computed(() => {
            const height = $main.value?.clientHeight ?? 0
            return Math.floor(height / 2 / 40) * 40
        })
        const transIndex = computed(() => {
            const moveValue = moveY.value > 0 ? Math.floor(moveY.value / 40) : Math.ceil(moveY.value / 40)
            return moveValue - selectBoxTrans.value / 40
        })
        const touchstart = (e: TouchEvent) => {
            startY = e.touches[0].pageY
        }
        const touchmove = (e: TouchEvent) => {
            moveY.value = e.touches[0].pageY - startY + transY
        }
        const touchend = (e: TouchEvent) => {
            let index = Math.floor(moveY.value / 40)
            index > selectBoxTrans.value / 40 ? index = selectBoxTrans.value / 40 : index = index
            Math.abs(index) > (props.columns.length - selectBoxTrans.value / 40) ? index = (-props.columns.length + 1) + selectBoxTrans.value / 40 : index = index
            moveY.value = index * 40
            transY = moveY.value
            const label: string = props.columns[Math.abs(transIndex.value)]?.label ?? ''
            emit('update:value', { label })
        }
        const labelClick = (i: number) => {
            const index: number = Math.abs(transIndex.value)
            i > index ? moveY.value -= 40 * (i - index) : moveY.value += (index - i) * 40
            transY = moveY.value
            const label: string = props.columns[index]?.label ?? ''
            emit('update:value', { label })
        }
        return () => (
            <div class={t['want-picker-scroll']} ref={$main}
                onTouchstart={touchstart}
                onTouchmove={touchmove}
                onTouchend={touchend}>
                <ul style={{ transform: `translateY(${moveY.value}px)` }}>
                    {props.columns.map((y: any, i: number) => {
                        return <li class={Math.abs(transIndex.value) == i ? t['active'] : ''} onClick={() => { labelClick(i) }}>{y.label}</li>
                    })}
                </ul>
                <div class={t["select-box"]} style={{ transform: `translateY(${selectBoxTrans.value}px)` }}></div>
            </div>
        )
    }
})