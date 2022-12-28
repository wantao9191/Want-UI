import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
// import { dialog } from '@/libs'
// interface child { label: string, value?: string }
// interface columsArray { [index: number]: Array<child> }
// interface valueArray { [index: number]: string | number }
export const App = defineComponent({
    setup(props, context) {
        const visible = ref(false)
        const click = ()=>{
            visible.value = true
        }
        return () => (
            <div class={t.app}>
                <want-button block onClick={click}>show</want-button>
                <want-sheet-action title='action-sheet' v-model:visible={visible.value} actions={[{ label: '选项一', value: 1 }]}></want-sheet-action>
            </div>
        )
    }
})
