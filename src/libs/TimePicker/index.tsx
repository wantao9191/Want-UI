import { defineComponent, computed, reactive } from 'vue'
import t from './index.module.scss'
export const TimePicker = defineComponent({
    props: {
        title: String,
        visible: Boolean,
        value: { type: Array },
        min: { type: Number, default: 1980 },
        max: { type: Number, default: 2050 }
    },
    emits: ['update:visible', 'update:value'],
    setup(props, { emit }) {
        const visible = computed(() => props.visible)
        const columns: any = computed(() => {
            const times: any = []
            for (let i = props.min; i < props.max; i++) {
                times.push({
                    label: i,  children: Array.from(new Array(12).keys()).map(a => {
                        return {
                            label: a + 1, pid: 2, children: Array.from(new Array(new Date(i, a, 0).getDate()).keys()).map(d => {
                                return { label: d + 1, pid: 3 }
                            })
                        }
                    })
                })
            }
            return times
        })
        let value = reactive(props.value?.length ? [...props.value] : new Array(3).fill(''))
        const action = (flag: boolean) => {
            emit('update:visible', flag)
        }
        const update = (v: any) => {
            for (let i = 0; i < v.length; i++) {
                value[i] = v[i]
            }
        }
        const confirm = () => {
            emit('update:value', [...value])
        }
        return () => (
            <want-picker
                visible={visible.value}
                onUpdate:visible={action}
                columns={columns.value}
                value={value}
                onPicker:change={update}
                title={props.title}
                onConfirm={confirm}
            ></want-picker>
        )
    }
})