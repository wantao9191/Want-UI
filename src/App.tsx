import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const value = ref(false)
        const value1 = ref(true)
        let groups = ref('2')
        const change = (value: any) => {
        }
        return () => (
            <div>
                <want-radio v-model:value={value.value}>复选框文案</want-radio>
                <want-radio v-model:value={value1.value} disabled>默认选中</want-radio>
                <want-radio-group v-model:value={groups.value} onChange={change} disabled>
                    <want-radio value='1'>复选框文案</want-radio>
                    <want-radio value='2'>默认选中</want-radio>
                </want-radio-group>
            </div>
        )
    }
})
