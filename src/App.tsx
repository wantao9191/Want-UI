import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const activeName = ref('1')
   
        return () => (
            <div>
                <want-tabs v-model:value={activeName.value}>
                    <want-tabs-pane name='1' label='标签一'>1</want-tabs-pane>
                    <want-tabs-pane name='2' label='标签二'>2</want-tabs-pane>
                    <want-tabs-pane name='3' label='标签三'>3</want-tabs-pane>
                    <want-tabs-pane name='4' label='标签四'>4</want-tabs-pane>
                    <want-tabs-pane name='5' label='标签五'>5</want-tabs-pane>
                    <want-tabs-pane name='6' label='标签六'>6</want-tabs-pane>
                    <want-tabs-pane name='7' label='标签七'>7</want-tabs-pane>
                    <want-tabs-pane name='8' label='标签八'>8</want-tabs-pane>
                    <want-tabs-pane name='9' label='标签九'>9</want-tabs-pane>
                    <want-tabs-pane name='10' label='标签十'>10</want-tabs-pane>
                </want-tabs>
            </div>
        )
    }
})
