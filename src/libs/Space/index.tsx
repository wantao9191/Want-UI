import { defineComponent } from 'vue'
import t from './index.module.scss'
export const Space = defineComponent({
    props: {
        block: Boolean,
        gutter: { type: [Number, String], default: 12 },
        direction: { type: String, default: 'horizontal' },
        justify: { type: String, default: 'flex-start' }
    },
    setup(props, { slots }) {
        return () => (
            <div class={[t['want-space'], t[`want-space-${props.direction}`]]} style={{'justify-content':props.justify}}>
                {slots.default?.().map(s => {
                    return <div class={t['want-space-item']} style={{ margin: `0 ${props.gutter}px ${props.gutter}px 0` }}>{s}</div>
                })}
            </div>
        )
    }
})