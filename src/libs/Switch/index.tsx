import { computed, defineComponent } from "vue";
import t from './index.module.scss'
export const Switch = defineComponent({
    props: {
        value: Boolean,
        type: { type: String, default: "primary" },
        disabled: Boolean,
        size: { type: String, default: "" },
        activeText: String,
        inactiveText: String,
    },
    setup(props, { slots, emit }) {
        const btnClass = computed(() => props.disabled ? "disabled" : "normal")
        const toggle = () => {
            if (props.disabled) return;
            emit("update:value", !props.value);
        };
        return () => (<span>
            {props.activeText ? <span class={[t[props.type], t[props.size], props.value ? t['want-checked'] : '', t['active-text'], t['switch-text']]}
            >{props.activeText}</span> : ''}
            <button class={[t["want-switch"], props.value ? t['want-checked'] : '', t[props.type], t[btnClass.value], t[props.size]]} onClick={toggle}>
                <span></span>
            </button>
            {props.activeText ? <span class={[t[props.size], t[props.type], t['switch-text']]}>{props.inactiveText}</span> : ''}

        </span >)
    }
})