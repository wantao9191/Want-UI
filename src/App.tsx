import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const visible = ref(false)
        const openModel = () => {
            visible.value = !visible.value
        }
        const slots = {
            title:()=>{ return <>slot header</>},
            footer:()=>{return <want-button block type='primary' onClick={openModel}>确定</want-button>}
        }
        return () => (
            <div>
                <want-button  type='primary' size='mini'>确定</want-button>
                <want-button block onClick={openModel}>Open Modal</want-button>
                <want-modal v-model:visible={visible.value} align='left' v-slots={slots} title='标题'>
                    1111
                </want-modal>
            </div>
        )
    }
})
