import { defineComponent, computed, reactive, watch } from 'vue'
import t from './index.module.scss'
import { PickerItem } from './pickerItem'
interface valueArray { [index: number]: string | number }
export const Picker = defineComponent({
    components: { PickerItem },
    props: {
        title: String,
        visible: Boolean,
        value: { type: Array, default: [] },
        columns: { type: Array, default: [] },
        mode: { type: String, default: '' },
        min: { type: Number, default: 1980 },
        max: { type: Number, default: 2050 }
    },
    emits: ['update:visible', 'update:value', 'confirm', 'picker:change'],
    setup(props, { emit }) {
        const visible = computed(() => props.visible)
        const columns = computed(() => props.columns)
        let value: valueArray = reactive(props.value as valueArray)
        const update = (value: boolean) => { emit('update:visible', value) }
        const cancel = () => { emit('update:visible', false) }
        const confirm = () => {
            emit('update:value', value)
            emit('update:visible', false)
            emit('confirm')
        }
        const pickerChange = (e: any, i: number) => {
            value[i] = e || ''
        }
        watch(() => props.value, (newVal, oldVal) => {
            value = reactive([...newVal] as valueArray)
        }, { deep: true })
        return () => (
            <want-popup visible={visible.value} onUpdate:visible={update} round>
                <div class={t['want-picker']}>
                    <header>
                        <want-button size='mini' fill='none' type='primary' onClick={cancel}>取消</want-button>
                        <want-button size='mini' fill='none' type='primary' onClick={confirm}>确定</want-button>
                    </header>
                    <main>
                        {columns.value.map((p: any, i: number) => {
                            return <picker-item
                                columns={p} index={i}
                                value={value[i]}
                                onUpdate:value={(e: any) => { pickerChange(e, i) }}
                            />
                        })}
                    </main>
                </div>
            </want-popup>
        )
    }
})