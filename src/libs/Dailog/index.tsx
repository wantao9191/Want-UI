import { defineComponent, reactive,withModifiers } from 'vue'
import t from './index.module.scss'
import { Button } from '../Button'
export const Dialog = defineComponent({
    props: {
        confirmButtonText: { type: String, default: '确定' },
        cancelButtonText: { type: String, default: '取消' },
        confirmButtonType: { type: String, default: 'primary' },
        cancelButtonType: { type: String, default: 'primary' },
        cancelButtonLoading: Boolean,
        confirmButtonLoading: Number,
        content: String,
        showCancel: Boolean,
        beforeClose: Function,
        closeOnMaskClick:Boolean
    },
    components: { wantButton: Button },
    setup(props, { emit }) {
        const instance = reactive({ confirmButtonLoading: false, cancelButtonLoading: false })
        const cancel = () => {
            emit('cancel', instance)
        }
        const confirm = () => {
            emit('confirm', instance)
        }
        const close = () => {
            emit('close')
        }
        return () => (
            <div class={t['want-dialog']} onClick={close}>
                <div class={t['want-dialog-wrap']} onClick={withModifiers(()=>{},['stop'])}>
                    <main v-html={props.content}></main>
                    <footer>
                        <want-button fill='none'
                            class={t['want-dialog-button']}
                            block size='large'
                            v-show={props.showCancel}
                            type={props.cancelButtonType}
                            onClick={cancel}
                            loading={instance.cancelButtonLoading}
                        >{props.cancelButtonText}</want-button>
                        <want-button
                            class={t['want-dialog-button']}
                            block
                            size='large'
                            fill='none'
                            onClick={confirm}
                            loading={instance.confirmButtonLoading}
                            type={props.confirmButtonType}
                        >{props.confirmButtonText}</want-button>
                    </footer>
                </div>
            </div>
        )
    }
})