import { computed, defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const visible = ref(false)
        const visible1 = ref(false)
        let value: any = reactive(['安徽','1'])
        let value1: any = reactive([])
        const aciton = () => {
            visible.value = !visible.value
        }
        const aciton1 = () => {
            visible1.value = !visible1.value
        }
        const columns = [{
            label: '江苏',
        },
        {
            label: '安徽',
        }, {
            label: '浙江'
        }, {
            label: '广西'
        }, {
            label: '广州'
        }, {
            label: '云南'
        }
    ]

        return () => (
            <div>
                {columns[0].label}
                <want-button block onClick={aciton}>选择</want-button>已选择:{value}
                <want-button block onClick={aciton1}>时间选择器</want-button> 已选择:{value1}
                <want-picker v-model:visible={visible.value} columns={columns} v-model:value={value} v-slots={{ title: () => { return '选择' } }}></want-picker>
                <want-picker v-model:visible={visible1.value} mode='date-picker' v-model:value={value1} v-slots={{ title: () => { return '时间选择器' } }}></want-picker>
            </div>
        )
    }
})
