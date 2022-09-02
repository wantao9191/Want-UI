import { computed, defineComponent, provide, ref } from 'vue'
import t from './tabs.module.scss'
export const Tabs = defineComponent({
    props: {
        value: { type: [String, Number] },
        beforeClose: { type: Function }
    },
    emits:['tab-click','update:value'],
    setup(props, { slots, emit }) {
        const labelWrap: any = ref('')
        const headerWrapWidth = computed(() => {
            let width = 0
            const nodes = labelWrap.value && labelWrap.value.querySelectorAll('.label-wrap')
            for (let i = 0; i < nodes.length; i++) {
                width += nodes[i].offsetWidth
            }
            return width
        })
        const labels: any = computed(() => {
            const nodes = labelWrap.value && labelWrap.value.querySelectorAll('.label-wrap')
            return slots.default?.().map((l: any, i: number) => {
                const rect = nodes[i]?.getBoundingClientRect() ?? {}
                rect.activeWidth = nodes[i]?.querySelector('.label').offsetWidth
                rect.activeOffset = nodes[i]?.querySelector('.label').offsetLeft
                console.log({ ...l.props, label: l.children.label?.() ?? l.props.label, rect })
                return { ...l.props, label: l.children.label?.() ?? l.props.label, rect }
            })
        })
        const activePos = computed(() => {
            const item = labels.value.find((v: any) => { return v.name === props.value })
            const width = item.rect?.activeWidth ?? 0
            const left = item.rect?.activeOffset ?? 0
            return {
                transform: `translateX(${left}px)`, width: width + 'px'
            }
        })
        const headerTransform = computed(() => {
            const contentWidth = labelWrap.value.parentElement?.clientWidth ?? 0
            const index = labels.value.findIndex((v: any) => { return v.name === props.value })
            const item = labels.value[index + 1] ?? labels.value[index]
            const right = item.rect.activeOffset+item.rect.width ?? 0
            return right > contentWidth ? contentWidth - right : 0
        })
        const done = (prop: any) => {
            emit('update:value', prop.name)
            emit('tab-click', prop)
        }
        const tabClick = (prop: any) => {
            if (prop.disabled) return
            const { rect, ...refer } = prop
            props.beforeClose ? props.beforeClose(() => done(refer)) : done(refer)
        }
        provide('tabs:value', computed(() => props.value))
        return () => (
            <div class={t['want-tabs']}>
                <div class={t['want-tabs-labels']}>
                    <div class={t['want-tabs-labels-wrap']} ref={labelWrap} style={{ width: headerWrapWidth.value + 'px', transform: `translate(${headerTransform.value}px)` }} >
                        {labels.value.map((l: any) => {
                            return <div class={[t['label-wrap'], 'label-wrap']} onClick={() => tabClick(l)} >
                                <div class={[
                                    l.name === props.value ? t.active : '',
                                    l.disabled ? t['label-disabled'] : '',
                                    t['label'],
                                    'label']}>{l.label}</div>
                            </div>
                        })}
                        <span class={t['active-line']} style={activePos.value}></span>
                    </div>
                </div>
                {slots.default?.()}
            </div>
        )
    }
})
