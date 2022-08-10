import { defineComponent, ref } from 'vue'
import t from './App.module.scss'
import { Toast } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const showToast = () => {
            const toastAction = Toast({ text: '一个toast！' })
            toastAction.show()
        }
        const activeName: { value?: number | string } = ref('3')
        return () => (
            <div>
                <want-tabs value={activeName.value} onUpdate:value={(e: string | number) => activeName.value = e}>
                    <want-tabs-pane name='1'label='选项一'>内容一</want-tabs-pane>
                    <want-tabs-pane label='选项二' name='2'>内容二</want-tabs-pane>
                    <want-tabs-pane label='选项三' name='3' disabled>内容三</want-tabs-pane>
                </want-tabs>
                {/* <want-tabs value={activeName.value} onUpdate:value={(e: string | number) => activeName.value = e}>
                    <want-tabs-pane name='1' v-slots={{ label: () => <>slot 选项一</> }}>内容一</want-tabs-pane>
                    <want-tabs-pane label='选项二' name='2'>内容二</want-tabs-pane>
                    <want-tabs-pane label='选项三' name='3'>内容三</want-tabs-pane>
                </want-tabs> */}
            </div>
        )
    }
})
