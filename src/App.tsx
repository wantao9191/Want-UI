import { computed, defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const visible = ref(false)
        let value: any = reactive([])
        const aciton = () => {
            visible.value = !visible.value
        }
        const columns: any = reactive([])
        setTimeout(() => {
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
        }, 2000);
        
        return () => (
            <div>
                <want-button block onClick={aciton}>选择</want-button> 已选择:{value}
                <want-picker v-model:visible={visible.value} columns={columns} v-model:value={value} v-slots={{ title: () => { return '时间选择器' } }}></want-picker>
            </div>
        )
    }
})
