import { defineComponent, h } from 'vue'
import s from './index.module.scss'
export const SheetAction = defineComponent({
    props: {
        title: { type: String, default: '' },
        actions: { type: Array, default: [] },
        value: { type: [String, Number], default: '' },
        valueKey: { type: String, default: '' },
        visible: { type: Boolean, default: false }
    },
    setup(props, context) {
        const close = (e?: any) => {
            e && e.stopPropagation()
            context.emit('update:visible', false)
        }
        const select = (item) => {
            context.emit('update:value', item[props.valueKey] || item['name'])
            context.emit('select', item[props.valueKey] || item['name'], item)
            close()
        }
        return () => (
            <div class={s.sheetWrap} onClick={close} v-show={props.visible}>
                <div class={s.sheetContent} onClick={$event => { $event.stopPropagation() }}>
                    <header>{props.title}</header>
                    <main>
                        <ul>
                            {props.actions.map(a => {
                                return (<li onClick={select.bind(null, a)}>{a.name}</li>)
                            })}
                        </ul>
                        <div v-show={!props.actions.length} class={s.noData}>暂无选项</div>
                    </main>
                </div>
            </div>
        )
    }
})