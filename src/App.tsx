import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const value = ref(false)
        const value1 = ref(false)
        let groups = reactive(['1'])
        const change = (value: any) => {
        }
        return () => (
            <div>
                <want-checkbox v-model:value={value.value} disabled>复选框文案</want-checkbox>
                <want-checkbox v-model:value={value1.value}>默认选中</want-checkbox>
                <want-checkbox-group v-model:value={groups} onChange={change} disabled>
                    <want-checkbox value='1'>复选框文案</want-checkbox>
                    <want-checkbox value='2'>默认选中</want-checkbox>
                </want-checkbox-group>
            </div>
        )
    }
})
