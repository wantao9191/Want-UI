import { computed, defineComponent, reactive, ref, watch } from 'vue'
import { PickerItem } from './pickerItem'
import t from './index.module.scss'
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
    setup(props, { slots, emit }) {
        const visible = computed(() => props.visible)
        const dates: any = reactive([])
        if (props.mode === 'date-picker') {
            for (let i = props.min; i < props.max; i++) {
                dates.push({
                    label: i, children: Array.from(new Array(12).keys()).map(a => {
                        return {
                            label: a + 1, pid: 2, children: Array.from(new Array(new Date(i, a + 1, 0).getDate()).keys()).map(d => {
                                return { label: d + 1, pid: 3 }
                            })
                        }
                    })
                })
            }
        }
        let value: any = reactive([...props.value])
        const columns: any = props.mode === 'date-picker' ? [dates] : reactive([[...props.columns]])
        watch(() => props.value, (newVal, oldVal) => {
            value = reactive([...newVal])
            value.forEach((v: any, i: number) => {
                setColums(v, i)
            })
        }, { deep: true })
        const update = (value: boolean) => {
            emit('update:visible', value)
        }
        const cancel = () => {
            emit('update:visible', false)
        }
        const confirm = () => {
            emit('update:value', value)
            emit('update:visible', false)
            emit('confirm')
        }
        const pickerChange = (e: any, i: number) => {
            value[i] = e || ''
            setColums(e, i)

        }
        const setColums = (e: any, i: number) => {
            if (columns[i]) {
                const item = columns[i].find((c: any) => c.label == e) || columns[i][0]
                if (item.children) {
                    columns.splice(i + 1, 1, item.children)
                } else {
                    columns.splice(i + 1, 1)
                }
            }

        }
        props.value.forEach((v: any, i: number) => {
            setColums(v, i)
        })
        return () => (
            <want-popup visible={visible.value} onUpdate:visible={update} round>
                <div class={t['want-picker']}>
                    <header>
                        <want-button size='mini' fill='none' type='primary' onClick={cancel}>取消</want-button>
                        <want-button size='mini' fill='none' type='primary' onClick={confirm}>确定</want-button>
                    </header>
                    <main>
                        {columns.map((p: any, i: number) => {
                            return <picker-item
                                columns={p} index={i}
                                value={value[i]}
                                onUpdate:value={(e: any) => { pickerChange(e, i) }}
                            ></picker-item>
                        })}
                    </main>
                </div>
            </want-popup>
        )
    }

})