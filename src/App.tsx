import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const visible = ref(false)
        const position = ref('bottom')
        const showBottom = (pos: string = 'bottom') => {
            position.value = pos
            visible.value = true
        }
        return () => (
            <div>
                <want-button block onClick={() => showBottom('bottom')}>底部弹出</want-button>
                <want-button block onClick={() => showBottom('top')} >顶部弹出</want-button>
                <want-button block onClick={() => showBottom('left')} >左部弹出</want-button>
                <want-button block onClick={() => showBottom('right')} >右部弹出</want-button>
                <want-popup v-model:visible={visible.value} position={position.value}>
                    {{ top: '顶', bottom: '底',left:'左',right:'右' }[position.value]}部弹出
                </want-popup>
            </div>
        )
    }
})
