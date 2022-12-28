import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
// interface child { label: string, value?: string }
// interface columsArray { [index: number]: Array<child> }
// interface valueArray { [index: number]: string | number }
export const App = defineComponent({
    setup(props, context) {
        const states = reactive({ active: '' })
        const click = ()=>{
            dialog.confirm({content:'云在青天水在瓶'})
        }
        return () => (
            <div class={t.app}>
                <want-button block type='primary' onClick={click} >show</want-button>
            </div>
        )
    }
})
