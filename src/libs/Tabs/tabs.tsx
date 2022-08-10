import { computed, defineComponent, provide, ref, VNode } from 'vue'
import t from './tabs.module.scss'
export const Tabs = defineComponent({
    props: {
        value: { type: [String, Number] },
        beforeClose: { type: Function }
    },
    setup(props, { slots, emit }) {
        const labelWrap = ref('')
        const activeStyle = computed(() => {
            const defaults: any = slots.default?.()
            const index = defaults.findIndex((s: VNode) => s.props?.name === props.value)
            const activeNode = labelWrap.value && labelWrap.value.querySelectorAll('.label')[index]
            if (defaults[index].props.disabled) return { height: '0px' }
            const { left, width } = activeNode && activeNode.getBoundingClientRect()
            return { width: width + 'px', left: left + 'px' }
        })
        const done = (prop: any) => {
            emit('update:value', prop.name)
            emit('tab-click',prop)
        }
        const tabClick = (prop: any) => {
            if (prop.disabled) return
            props.beforeClose ? props.beforeClose(()=>done(prop)) :done(prop)
        }

        provide('value', computed(() => props.value))
        return () => (
            <div class={t['want-tabs']}>
                <div class={t['want-tabs-labels']}>
                    <div class={t['want-tabs-labels-wrap']} ref={labelWrap}>
                        {slots.default?.().map((l: any) => {
                            return <div class={t['label-wrap']} onClick={() => tabClick(l.props)} >
                                <div class={[
                                    l.props.name === props.value ? t.active : '',
                                    l.props.disabled ? t['label-disabled'] : '',
                                    t['label'],
                                    'label']} >{l.children.label?.() ?? l.props.label}</div>
                            </div>
                        })}
                        <span class={t['active-line']} style={activeStyle.value}></span>
                    </div>
                </div>
                {slots.default?.()}
            </div>
        )
    }
})