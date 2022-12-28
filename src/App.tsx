import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
interface child { label: string, value?: string }
interface columsArray { [index: number]: Array<child> }
interface valueArray { [index: number]: string | number }
export const App = defineComponent({
    setup(props, context) {
        const visible1 = ref(false)
        const click1 = () => visible1.value = true
        return () => (
            <div class={t.app}>
                <want-button block onClick={click1}>最简单的用法</want-button>
                <want-modal v-model:visible={visible1.value} title='Modal' v-slots={{ footer: () => { return <want-button block type='primary' onClick={() => { visible1.value = false }}>确定</want-button> } }}>
                    云在青天水在瓶
                </want-modal>
            </div>
        )
    }
})
