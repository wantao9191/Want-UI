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
        setTimeout(() => {
            // value.push('江苏')
        }, 1000);
        const columns = [{
            label: '江苏',
            children: [
                { label: '南京' },
                { label: '苏州' },
                { label: '无锡' },
                { label: '徐州' },
                { label: '南通' },
                { label: '扬州' },
            ]
        },
        {
            label: '安徽',
            children: [
                { label: '合肥' },
                { label: '芜湖' },
                { label: '铜陵' },
                { label: '安庆' },
                { label: '池州' },
                { label: '黄山' },
                { label: '南京' },
                { label: '苏州' },
                { label: '无锡' },
                { label: '徐州' },
                { label: '南通' },
                { label: '扬州' },
            ]
        }]
        return () => (
            <div>
                {columns[0].label}
                {/* <want-button block onClick={aciton}>选择</want-button> */}
                <want-button block onClick={aciton}>时间选择器</want-button> 已选择:{value}
                <want-picker v-model:visible={visible.value} columns={columns} v-model:value={value} v-slots={{ title: () => { return '选择' } }}></want-picker>
                {/* <want-time-picker v-model:visible={visible.value} v-model:value={value} v-slots={{ title: () => { return '时间选择器' } }}></want-time-picker> */}
            </div>
        )
    }
})
