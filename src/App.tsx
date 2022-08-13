import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        let activeName = reactive(['1', '2'])
        // const activeName = ref('1')
        return () => (
            <div>
                <want-collapse v-model:value={activeName}>
                    <want-collapse-pane title='选项1' name='1'>1
                        <br />
                        1
                        <br />
                        1
                        <br />1
                    </want-collapse-pane>
                    <want-collapse-pane title='选项2' name='2' disabled>2</want-collapse-pane>
                    <want-collapse-pane title='选项3' name='3' disabled>3</want-collapse-pane>
                    <want-collapse-pane title='选项4' name='4'>4</want-collapse-pane>
                </want-collapse>
            </div>
        )
    }
})
