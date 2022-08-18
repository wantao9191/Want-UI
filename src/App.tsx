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
        const columns = reactive([[{ label: '江苏' }, { label: '安徽' }]])
        return () => (
            <div>
                {/* <want-button block onClick={aciton}>选择</want-button> */}
                <want-button block onClick={aciton}>时间选择器</want-button> 已选择:{value}
                <want-picker v-model:visible={visible.value} columns={columns} v-model:value={value} v-slots={{ title: () => { return '选择' } }}></want-picker>
                {/* <want-time-picker v-model:visible={visible.value} v-model:value={value} v-slots={{ title: () => { return '时间选择器' } }}></want-time-picker> */}
            </div>
        )
    }
})
