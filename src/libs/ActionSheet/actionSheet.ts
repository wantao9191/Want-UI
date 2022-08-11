import { createApp, h } from "vue";
import { ActionSheet } from "./index";
type prop = {
    actions?: object
    title?: string,
    cancelText?: string
    onClose: any
    beforeClose?: any,
    showCancel?: boolean,
    closeOnMaskClick?:boolean
}
export const actionSheet = ({ actions, title, cancelText, showCancel,closeOnMaskClick, beforeClose }: prop) => {
    const dom = document.createElement('div')
    let instance: any
    const close = () => {
        if (beforeClose) return
        dom.remove()
        instance.unmount()
    }
    const app = () => createApp({
        render() {
            return h(ActionSheet, {
                actions, title, cancelText, visible: true, showCancel,closeOnMaskClick,
                onClose: close,
                beforeClose: beforeClose ? (action: string, prop?: any) => {
                    beforeClose(action, prop, () => {
                        dom.remove()
                        instance.unmount()
                    })
                } : null
            })
        }
    })
    return {
        show: () => {
            instance = app()
            instance.mount(dom)
            document.body.append(dom)
        }
    }
}
