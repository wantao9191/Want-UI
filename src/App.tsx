import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const activeName = ref('1')
        return () => (
            <div>
                <want-collapse>
                    <want-collapse-pane title='选项1'>1
                    <br />
                    1
                    <br />
                    1
                    <br />1
                    </want-collapse-pane>
                    <want-collapse-pane title='选项2'>2</want-collapse-pane>
                    <want-collapse-pane title='选项3'>3</want-collapse-pane>
                    <want-collapse-pane title='选项4'>4</want-collapse-pane>
                </want-collapse>
            </div>
        )
    }
})
