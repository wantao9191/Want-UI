import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const showBasic = () => {
            dialog.confirm({ content: '基本用法 Confirm Dialog', confirmButtonText: '我知道了', cancelButtonType: 'danger', }).then(() => {
                console.log('then')
            }).catch(() => {
                console.log('catch')
            })
        }
        const showAlert = () => {
            dialog.alert({ content: '基本用法 Alert Dialog' }).then(() => {
                console.log('then')
            })
        }
        const showAfter = () => {
            dialog.confirm({
                content: '异步关闭', beforeClose: (action: string, instance: any, done: any) => {
                    console.log(action)
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true
                        setTimeout(() => {
                            instance.confirmButtonLoading = false
                            done()
                        }, 1000);
                    } else {
                        done()
                    }

                }
            })
        }
        return () => (
            <div>
                <want-button onClick={showBasic} block>Confirm</want-button>
                <want-button onClick={showAlert} block>Alert</want-button>
                <want-button onClick={showAfter} block>异步关闭</want-button>
            </div>
        )
    }
})
