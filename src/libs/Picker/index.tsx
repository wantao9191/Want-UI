import { computed, defineComponent, reactive, ref } from 'vue'
import { PickerItem } from './pickerItem'
import t from './index.module.scss'
export const Picker = defineComponent({
    components: { PickerItem },
    props: {
        visible: Boolean,
        columns: { type: Array, default: [] },
        value: { type: Array }
    },
    emits: ['update:visible'],
    setup(props, { slots, emit }) {
        const visible = computed(() => props.visible)
        const value = reactive([{}, {}, {}])
        const yearIndex = ref(0)
        const monthIndex = ref(0)
        const columns: any = reactive([]) 
        for (let i = 2000; i < 2050; i++) {
            columns.push({
                label: i, children: Array.from(new Array(12).keys()).map(a => {
                    return {
                        label: a + 1, children: Array.from(new Array(new Date(i, a, 0).getDate()).keys()).map(d => {
                            return { label: d + 1 }
                        })
                    }
                })
            })
        }
        const update = (value: boolean) => {
            emit('update:visible', value)
        }
        return () => (
            <want-popup visible={visible.value} onUpdate:visible={update} round>
                <div class={t['want-picker']}>
                    <header>
                        <want-button size='mini' fill='none' type='primary'>取消</want-button>
                        <want-button size='mini' fill='none' type='primary'>确定</want-button>
                    </header>
                    <main>
                        <picker-item columns={columns} v-model:value={value[0]}></picker-item>
                        <picker-item columns={columns[yearIndex.value].children} v-model:value={value[1]}></picker-item>
                        <picker-item columns={columns[yearIndex.value].children[monthIndex.value].children} v-model:value={value[2]}></picker-item>
                    </main>
                </div>
            </want-popup>
        )
    }
})