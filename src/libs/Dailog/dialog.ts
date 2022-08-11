import { createApp, h, ref } from "vue";
import { Dialog } from ".";
type prop = {
    content?: string
    showCancel?: boolean
    confirm: any
    cancel: any,
    confirmButtonText?: string
    cancelButtonText?: string
    confirmButtonType?: string
    cancelButtonType?: string
    beforeClose?: any
}
const createDialog = ({ ...args }: prop) => {
    const dom = document.createElement('div')
    const app = () => createApp({
        render() {
            return h(Dialog, { ...args, onConfirm: args.confirm, onCancel: args.cancel,onClose:()=>{args.cancel({},'close')} })
        }
    })
    return { dom, app }
}
const initDialog = ({ ...args }: prop,type:string='confirm')=>{
    return new Promise((resolve: any, reject: any) => {
        const confirm = (instance: any) => {
            if (args.beforeClose) {
                args.beforeClose('confirm', instance, remove)
                return
            }
            remove()
            resolve()
        }
        const cancel = (instance: any, action: string = 'cancel') => {
            if (args.beforeClose) {
                args.beforeClose(action, instance, remove)
                return
            }
            remove()
            reject()
        }
        const { dom, app } = createDialog({ ...args, showCancel:type === 'confirm', confirm, cancel })
        const instance = app()
        instance.mount(dom)
        document.body.append(dom)
        const remove = () => {
            instance.unmount()
            dom.remove()
        }
    })
}
export const dialog = {
    confirm: ({ ...args }: prop) => {
        return initDialog(args)
    },
    alert: ({ ...args }: prop) => {
        return initDialog(args,'alert')
    },
}