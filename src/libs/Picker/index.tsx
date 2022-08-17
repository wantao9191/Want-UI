import { computed, defineComponent, reactive, ref } from 'vue'
import { PickerItem } from './pickerItem'
import t from './index.module.scss'
export const Picker = defineComponent({
    components: { PickerItem },
    props: {
        title: String,
        visible: Boolean,
        columns: { type: Array, default: [] },
        value: { type: Array }
    },
    emits: ['update:visible', 'update:value'],
    setup(props, { slots, emit }) {
        const visible = computed(() => props.visible)
        const value: any = reactive(['', '', ''])
        const yearIndex = ref(0)
        const monthIndex = ref(0)
        const propsColums = props.columns
        const update = (value: boolean) => {
            emit('update:visible', value)
        }
        const cancel = () => {
            emit('update:visible', false)
        }
        const confirm = () => {
            emit('update:value', value)
            emit('update:visible', false)
        }
        const updateValue = (value: any) => {
            emit('update:value', value)
        }
        return () => (
            <want-popup visible={visible.value} onUpdate:visible={update} round>
                <div class={t['want-picker']}>
                    <header>
                        <want-button size='mini' fill='none' type='primary' onClick={cancel}>取消</want-button>
                        <want-button size='mini' fill='none' type='primary' onClick={confirm}>确定</want-button>
                    </header>
                    <main>
                        <picker-item columns={propsColums} v-model:value={value[0]}></picker-item>
                        {/* <picker-item columns={columns[yearIndex.value].children} v-model:value={value[1]}></picker-item>
                        <picker-item columns={columns[yearIndex.value].children[monthIndex.value].children} v-model:value={value[2]}></picker-item> */}
                    </main>
                </div>
            </want-popup>
        )
    }
})