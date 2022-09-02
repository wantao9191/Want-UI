import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const activeName: { value?: number | string } = ref('1')

        return () => (
            <div class={t.app}>
                <want-tabs value={activeName.value} onUpdate:value={(e: string | number) => activeName.value = e}>
                    <want-tabs-pane name='1' label='选项一'>内容一</want-tabs-pane>
                    <want-tabs-pane label='选项二' name='2'>内容二</want-tabs-pane>
                    <want-tabs-pane label='选项三' name='3'>内容三</want-tabs-pane>
                    <want-tabs-pane label='选项三' name='4'>内容三</want-tabs-pane>
                    <want-tabs-pane label='选项三' name='5'>内容三</want-tabs-pane>
                    <want-tabs-pane label='选项三' name='6'>内容三</want-tabs-pane>
                </want-tabs>
            </div>
        )
    }
})
