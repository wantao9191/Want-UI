import { defineComponent } from 'vue'
import t from './App.module.scss'
import { Toast } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const showToast = () => {
            const toastAction = Toast({ text: '一个toast！' })
            toastAction.show()
        }
        return () => (
            <div class={t.app}>
                <want-noticebar></want-noticebar>
            </div>
        )
    }
})