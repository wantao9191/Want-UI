import { defineComponent, ref, computed, nextTick } from 'vue'
import t from './pickerItem.module.scss'
export const PickerItem = defineComponent({
    props: { columns: { type: Array, default: [] }, value: { type: [String, Number, Object] } },
    emits: ['update:value'],
    setup(props, { emit }) {
        const $main: any = ref('')
        let startY = 0
        let transY = 0
        const touching = ref(false)
        const moveY = ref(0)
        const transMove = computed(() => {
            let index: number = props.columns.findIndex((c: any) => c.label == props.value)
            index = index > -1 ? index : 0
            let moveIndex = moveY.value <= 0 ? -index : index
            let moveTrans = moveIndex * 40 + selectBoxTrans.value
            if (moveY.value > 0 && moveY.value <= selectBoxTrans.value) {
                moveTrans = (selectBoxTrans.value / 40 - moveIndex) * 40
            }
            transY = moveTrans
            return moveTrans
        })
        const selectBoxTrans = computed(() => {
            const height = $main.value?.clientHeight ?? 0
            return Math.floor(height / 2 / 40) * 40
        })
        const transIndex = computed(() => {
            const moveValue = moveY.value > 0 ? Math.floor((moveY.value - selectBoxTrans.value) / 40) : Math.ceil((moveY.value - selectBoxTrans.value) / 40)
            return Math.abs(moveValue)
        })
        const touchstart = (e: TouchEvent) => {
            touching.value = true
            moveY.value = transMove.value
            startY = e.touches[0].pageY
        }
        const touchmove = (e: TouchEvent) => {
            moveY.value = e.touches[0].pageY - startY + transY
            if (moveY.value > selectBoxTrans.value) {
                moveY.value = selectBoxTrans.value
            }else if(Math.abs(moveY.value)  > (props.columns.length-1) *40-selectBoxTrans.value){
                moveY.value = -((props.columns.length-1) *40-selectBoxTrans.value)
            }
        }
        const touchend = (e: TouchEvent) => {
            emit('update:value', props.columns[transIndex.value]?.label)
            nextTick(() => {
                touching.value = false
            })
        }
        const labelClick = (label: number|string) => {
            emit('update:value',label)
        }
        return () => (
            <div class={t['want-picker-scroll']} ref={$main}
                onTouchstart={touchstart}
                onTouchmove={touchmove}
                onTouchend={touchend}>
                <ul style={{ transform: `translateY(${touching.value ? moveY.value : transMove.value}px)` }}>
                    {props.columns.map((y: any, i: number) => {
                        return <li class={props.value == y.label ? t['active'] : ''} key={i} onClick={() => { labelClick(y.label) }}>{y.label}</li>
                    })}
                </ul>
                <div class={t["select-box"]} style={{ transform: `translateY(${selectBoxTrans.value}px)` }}></div>
            </div>
        )
    }
})