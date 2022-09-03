import { defineComponent, withModifiers } from 'vue'
import t from './index.module.scss'
export const ActionSheet = defineComponent({
    props: {
        actions: { type: Array, default: [] },
        propOptions: { type: Object, default: { label: 'label', value: 'value' } },
        cancelText: { type: String, default: '取消' },
        showCancel: { type: Boolean, default: false },
        closeOnMaskClick: { tpye: Boolean, default: true },
        visible: Boolean,
        title: String,
        beforeClose: Function,
    },
    emits: ['action', 'update:visible', 'close'],
    setup(props, { slots, emit }) {
        const close = ({ prop, action }: { prop?: any, action: string }) => {
            if (!props.closeOnMaskClick && action === 'close') return
            if (props.beforeClose) {
                props.beforeClose(action, prop, () => {
                    emit('update:visible', false)
                    emit('close')
                })
                return
            }
            emit('update:visible', false)
            emit('close')
        }
        const onClick = ((prop: any) => {
            if (prop.disabled) return
            emit('action', prop)
            close({ prop, action: 'action' })
        })
        return () => (
            <>{props.visible ? <div class={t['want-action-sheet']} onClick={() => { close({ action: 'close' }) }}>
                <div class={[t['want-sheet-wrap'], t.enter]} onClick={withModifiers(() => { }, ['stop'])}>
                    <header class={slots.title ? t.header : ''}>{slots.title?.() ?? <div class={t.header}>{props.title}</div>}</header>
                    <main>
                        {props.actions.map((a: any) => {
                            return <div class={
                                [t['action-list-item'],
                                a.danger ? t['danger-item'] : '',
                                a.disabled ? t['disabled-item'] : '']}
                                onClick={() => { onClick(a) }}>{a[props.propOptions.label]}</div>
                        })}
                    </main>
                    <footer v-show={props.showCancel} onClick={() => { close({ action: 'cancel' }) }}>
                        {props.cancelText}
                    </footer>
                </div>
            </div> : ''}</>)
    }
})