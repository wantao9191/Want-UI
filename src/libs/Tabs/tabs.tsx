import { computed, defineComponent, provide, ref } from 'vue'
import t from './tabs.module.scss'
export const Tabs = defineComponent({
    props: {
        value: { type: [String, Number] }
    },
    setup(props, { slots, emit }) {
        const labelWrap = ref('')
        const activeStyle = computed(() => {
            const index = slots.default?.().findIndex(s => {
                return s.props?.name === props.value
            })
            const activeNode = labelWrap.value && labelWrap.value.querySelectorAll('.label')[index]
            const { left, width } = activeNode && activeNode.getBoundingClientRect()
            return { width: width + 'px', left: left + 'px' }
        })
        const tabClick = (prop: any) => {
            if(prop.disabled)return
            emit('update:value', prop.name)
        }
        provide('value', computed(() => props.value))
        return () => (
            <div class={t['want-tabs']}>
                <div class={t['want-tabs-labels']}>
                    <div class={t['want-tabs-labels-wrap']} ref={labelWrap}>
                        {slots.default?.().map((l: any) => {
                            return <div class={t['label-wrap']} onClick={() => tabClick(l.props)} >
                                <div class={[
                                    l.props.name === props.value ? [t.active, 'active'] : '',
                                    l.props.disabled ? t['label-disabled'] : '',
                                    t['label'],
                                    'label']} >{l.children.label?.()??l.props.label}</div>
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