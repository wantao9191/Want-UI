import { computed, defineComponent, inject, Transition } from 'vue'
import { Icon } from '../Icon'
import t from './collapsePane.module.scss'
export const CollapsePane = defineComponent({
    components: { wantIcon: Icon },
    props: { title: String, name: [String, Number], disabled: Boolean },
    setup(props, { slots }) {
        const value: any = inject('collapse:value')
        const accordion: any = inject('collapse:accordion')
        const updateValue: any = inject('collapse:updateValue')
        const slider = computed(() => {
            return accordion.value ? value.value === props.name : value.value.includes(props.name)
        })
        const click = () => {
            if (props.disabled) return
            updateValue?.(props.name)
        }
        const elTransition = '0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out'
        const beforeEnter = (el: any) => {
            el.style.transition = elTransition
            if (!el.dataset) el.dataset = {}

            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom

            el.style.height = 0
            el.style.paddingTop = 0
            el.style.paddingBottom = 0
        }
        const enter = (el: any) => {
            el.dataset.oldOverflow = el.style.overflow
            if (el.scrollHeight !== 0) {
                el.style.height = el.scrollHeight + 'px'
                el.style.paddingTop = el.dataset.oldPaddingTop
                el.style.paddingBottom = el.dataset.oldPaddingBottom
            } else {
                el.style.height = ''
                el.style.paddingTop = el.dataset.oldPaddingTop
                el.style.paddingBottom = el.dataset.oldPaddingBottom
            }
            el.style.overflow = 'hidden'
        }
        const afterEnter = (el: any) => {
            el.style.transition = ''
            el.style.height = ''
            el.style.overflow = el.dataset.oldOverflow
        }
        const beforeLeave = (el: any) => {
            if (!el.dataset) el.dataset = {}
            el.dataset.oldPaddingTop = el.style.paddingTop
            el.dataset.oldPaddingBottom = el.style.paddingBottom
            el.dataset.oldOverflow = el.style.overflow
            el.style.height = el.scrollHeight + 'px'
            el.style.overflow = 'hidden'
        }
        const leave = (el: any) => {
            if (el.scrollHeight !== 0) {
                el.style.transition = elTransition
                el.style.height = 0
                el.style.paddingTop = 0
                el.style.paddingBottom = 0
            }
        }
        const afterLeave = (el: any) => {
            el.style.transition = ''
            el.style.height = ''
            el.style.overflow = el.dataset.oldOverflow
            el.style.paddingTop = el.dataset.oldPaddingTop
            el.style.paddingBottom = el.dataset.oldPaddingBottom
        }
        return () => (
            <div class={[t['want-collapse-pane'], props.disabled ? t['want-collapse-disabled-pane'] : '']}>
                <header onClick={click}>
                    <span class={t['header-content']}>{slots.title?.() ?? props.title}</span>
                    <span class={t['header-icon']}>
                        {slots.rightIcon?.() ?? <want-icon name={slider.value ? 'up' : 'down'} class={t.icon}></want-icon>}
                    </span>
                </header>
                <Transition
                    appear
                    onBeforeEnter={beforeEnter}
                    onEnter={enter}
                    onAfterEnter={afterEnter}
                    onBeforeLeave={beforeLeave}
                    onLeave={leave}
                    onAfterLeave={afterLeave}>
                    {slider.value ? <main>
                        <div>{slots.default?.()}</div>
                        
                    </main> : ''}
                </Transition>
            </div>
        )
    }
})
