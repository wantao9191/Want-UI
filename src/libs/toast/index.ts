import { createApp, h } from "vue";
import { toast } from "./toast";
type props = {
    text: string
    duration: number
    mask: boolean
    instance: any,
    top: string,
    align: string
}
export const Toast = function ({ text, duration, mask, align, top, instance }: props) {
    const dom = document.createElement('div')
    const remove = () => {
        dom.remove()
        instance.unmount()
        instance = null
    }
    const app = () => createApp({
        render() {
            if (duration) {
                setTimeout(remove, duration);
            }
            return h(toast, { text, mask, align, top })
        }
    })
    return {
        show: () => {
            if (instance) return
            instance = app()
            instance.mount(dom)
            document.body.append(dom)
        },
        remove
    }
}