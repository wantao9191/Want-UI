import { createApp, h } from "vue"
import { SheetAction } from "./index.tsx";
type value = { value: object }
type props = {
    title: string
    content: string
    instance: any
    actions: object
    value: value
}
export const sheetAction = ({ title, content, instance, actions, value }: props) => {
    const dom = document.createElement('div')
    const remove = () => {
        dom.remove()
        instance.unmount()
        instance = null
    }
    const close = (callback: any) => {
        callback && callback()
        remove()
    }
    const confirmApp = () => createApp({
        render() {
            return h(SheetAction, {
                title, content, actions,
                value: value.value,
                'onUpdate:value': (a: string | number, b: object) => {
                    value.value = a
                },
                visible: true,
                'onUpdate:visible': remove,
                onConfirm: () => { },
                onCancel: () => { },
                onClose: remove
            })
        }
    })
    return {
        show: () => {
            instance = confirmApp()
            instance.mount(dom)
            document.body.append(dom)
        }
    }
}