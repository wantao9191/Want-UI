import { computed, defineComponent, inject, ref } from 'vue'
import { Icon } from '../Icon'
import t from './collapsePane.module.scss'
export const CollapsePane = defineComponent({
    components: { wantIcon: Icon },
    props: { title: String, name: [String, Number] },
    setup(props, { slots }) {
        const value: any = inject('value')
        const visible = ref(false)
        const slider = computed(() => {
            if(visible.value){
                return true
            }
            value.value?.includes(props.name) || visible.value
        })
        const click = ()=>{
            visible.value = !visible.value
        }
        return () => (<div class={t['want-collapse-pane']}>
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