import { defineComponent, ref } from 'vue'
import t from './App.module.scss'
import { Toast } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const showToast = () => {
            const toastAction = Toast({ text: '一个toast！' })
            toastAction.show()
        }
       const visible = ref(true)
        return () => (
            <div>
               <want-sheet-action v-model:visible={visible.value}></want-sheet-action>
            </div>
        )
    }
})
