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
        const close = () => {
            visible.value = false
        }
        const slots = {
            right: () => {
                return <><want-button fill='none' size='mini' type='primary'>查看详情</want-button><want-button fill='none' size='mini'>关闭</want-button></>
            }
        }
        const slots2 = {
            right:()=>{
                return <want-icon name='double-right'></want-icon>
            }
        }
        return () => (
            <div class={t.app}>
                <div>
                    <want-noticebar content='default' type='default'></want-noticebar>
                    <want-noticebar content='info' type='info'></want-noticebar>
                    <want-noticebar content='alert' type='alert'></want-noticebar>
                    <want-noticebar content='error' type='error'></want-noticebar>
                </div>
                <div>
                    <want-noticebar content='info' type='info' closeable v-show={visible.value} onClose={() => close()}></want-noticebar>
                </div>
                <div>
                    <want-noticebar content='info' type='alert' icon='download'></want-noticebar>
                </div>
                <div>
                <want-noticebar content='info' icon='download' type='error' v-slots={slots2}></want-noticebar>
                    <want-noticebar content='右侧内容通过slots替换' icon='download' v-slots={slots}></want-noticebar>
                </div>
            </div>

        )
    }
})