import { computed, defineComponent, inject, ref } from 'vue'
import { Icon } from '../Icon'
import t from './collapsePane.module.scss'
export const CollapsePane = defineComponent({
    components: { wantIcon: Icon },
    props: { title: String, name: [String, Number], disabled: Boolean },
    setup(props, { slots }) {
        const value: any = inject('collapse:value')
        const accordion: any = inject('collapse:accordion')
        const updateValue: any = inject('collapse:updateValue')
        const visible = ref(false)
        const slider = computed(() => {
            return accordion.value ? value.value === props.name : value.value.includes(props.name)
        })
        const click = () => {
            if (props.disabled) return
            updateValue?.(props.name)
        }
        return () => (<div class={[t['want-collapse-pane'], props.disabled ? t['want-collapse-disabled-pane'] : '']}>
            <header onClick={click}>
                <span class={t['header-content']}>{slots.title?.() ?? props.title}</span>
                <span class={t['header-icon']}>
                    {slots.rightIcon?.() ?? <want-icon name={slider.value ? 'up' : 'down'} class={t.icon}></want-icon>}
                </span>
            </header>
            <main class={slider.value ? t['main-slider'] : t['main-hidden']}>
                <div v-show={slider.value}>{slots.default?.()}</div>
            </main>
        </div>)
    }
})