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
    },
    emits: ['update:visible', 'update:value', 'confirm', 'picker:change'],
    setup(props, { slots, emit }) {
        const visible = computed(() => props.visible)
        let value: any = props.value
        watch(() => props.value, (newVal, oldVal) => {
            value = reactive([...newVal])
        }, { deep: true })
        const propsColums: any = computed(() => {
            // const results: any = {}
            // flat(props.columns, results)
            // const valuesArr: any = Object.values(results)
            // return valuesArr
            console.log(props.columns)
            return props.columns
        })
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
        const flat = (data: any, results: any) => {
            let arr: any = {}
            data.forEach((d: any) => {
                const { children, ...i } = d
                if (!i.pid) {
                    results['default'] ? results['default'].push(i) : results['default'] = [i]
                } else {
                    arr[i.pid] ? arr[i.pid].push({ label: i.label }) : arr[i.pid] = [{ label: i.label }]
                }
                if (d.children) flat(d.children, results)
            })
            for (let k in arr) {
                results[k] ? results[k].push(arr[k]) : results[k] = [arr[k]]
            }
        }
        const pickerChange = (e: any, i: number, rows?: any) => {
            value[i] = e
            // console.log(value, '----')
            emit('picker:change', value)
        }
        return () => (
            <want-popup visible={visible.value} onUpdate:visible={update} round>
                <div class={t['want-picker']}>
                    <header>
                        <want-button size='mini' fill='none' type='primary' onClick={cancel}>取消</want-button>
                        <want-button size='mini' fill='none' type='primary' onClick={confirm}>确定</want-button>
                    </header>
                    <main>
                        {propsColums.value.map((p: any, i: number) => {
                            return <picker-item columns={p} value={value[i]} onUpdate:value={(e: any) => { pickerChange(e, i, p[0]) }}></picker-item>
                        })}
                    </main>
                </div>
            </want-popup>
        )
    }

})