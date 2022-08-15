import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const visible = ref(false)
        const aciton = () => {
            visible.value = !visible.value
        }
        return () => (
            <div>
                <want-button block onClick={aciton}>选择</want-button>
                <want-picker v-model:visible={visible.value}></want-picker>
            </div>
        )
    }
})
