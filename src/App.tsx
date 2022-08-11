import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { Toast, actionSheet } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const showToast = () => {
            const toastAction = Toast({ text: '一个toast！' })
            toastAction.show()
        }
        const visible = ref(false)
        const showAction = () => {
            visible.value = true
        }
        const actions = reactive([
            { label: '选项一', value: '1' },
            { label: '选项二', value: '2', disabled: true, danger: true },
            { label: '选项三', value: '3', danger: true },
            { label: '选项四', value: '3' },
        ])
        const onAction = (value: any) => {
            console.log(value)
        }
        const beforeClose = ((action: string, prop: any, done: any) => {
            console.log(action)
            // showToast()
            // setTimeout(() => {
            done()
            // }, 2000);
        })
        const actionDirect = () => {
            actionSheet({
                actions, title: 'Action Sheet', cancelText: 'cancel', beforeClose: (action: string, prop: any, done: any) => {
                    console.log(prop, action)
                    // done()
                }
            }).show()
        }
        return () => (
            <div>
                <want-button onClick={showAction}>基本用法</want-button>
                <want-button onClick={actionDirect}>指令调用</want-button>
                <want-sheet-action
                    v-model:visible={visible.value}
                    title='Action Sheet' actions={actions}
                    onAction={onAction}
                    beforeClose={beforeClose}
                    v-slots={{ title: () => 'slot-title' }}
                    closeOnMaskClick={false}
                ></want-sheet-action>
            </div>
        )
    }
})
