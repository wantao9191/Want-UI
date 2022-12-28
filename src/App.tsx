import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
// import { dialog } from '@/libs'
// interface child { label: string, value?: string }
// interface columsArray { [index: number]: Array<child> }
// interface valueArray { [index: number]: string | number }
export const App = defineComponent({
    setup(props, context) {
        const states = reactive({ active: [] })
        return () => (
            <div class={t.app}>
                <want-collapse v-model:value={states.active}>
                    <want-collapse-pane title='第一项' name='1'>第一项内容</want-collapse-pane>
                    <want-collapse-pane title='第二项' name='2'>第二项内容</want-collapse-pane>
                    <want-collapse-pane title='第三项' name='3'>第三项内容</want-collapse-pane>
                    <want-collapse-pane title='第四项' name='4'>第四项内容</want-collapse-pane>
                </want-collapse>
            </div>
        )
    }
})
