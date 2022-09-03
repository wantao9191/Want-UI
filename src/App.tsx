import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const visible = ref(true)

        return () => (
            <div class={t.app}>
                <want-button block >禁用选项和危险选项</want-button>
                <want-sheet-action
                    v-model:visible={visible.value}
                    title=''
                    actions={
                        [{ label: '选项一' },
                        { label: '选项二', disabled: true },
                        { label: '选项三', danger: true }]
                    }
                ></want-sheet-action>
            </div>
        )
    }
})
