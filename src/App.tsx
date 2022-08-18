import { computed, defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const value = ref('')
        const slots = {
            button:()=>{
                return <want-button type='primary' size='mini'>发送</want-button>
            }
        }
        const slotIcon= {
            rightIcon:()=>{
                return <want-icon name='woman'></want-icon>
            }
        }
        return () => (
            <div class={t.app}>
                <want-input v-model:value={value.value} label='输入框' placeholder='请输入文字'></want-input>
                <want-input v-model:value={value.value} label='输入框' placeholder='请输入文字' v-slots={slots}></want-input>
                <want-input v-model:value={value.value} label='输入框' placeholder='禁用' disabled></want-input>
                <want-input v-model:value={value.value} label='输入框' placeholder='只读' readonly></want-input>
                <want-input v-model:value={value.value} label='输入框' placeholder='右对齐' align='right'></want-input>
                <want-input v-model:value={value.value} label='输入框' placeholder='居中' align='center'></want-input>
                <want-input v-model:value={value.value} label='输入框' placeholder='居中' clearable></want-input>
                <want-input v-model:value={value.value} label='输入框' placeholder='icon' rightIcon='android'></want-input>
                <want-input v-model:value={value.value} label='输入框' placeholder='slot方式展示icon' v-slots={slotIcon}></want-input>
                <want-input v-model:value={value.value} label='输入框' placeholder='限制数量' maxlength='10' show-word-limit></want-input>

            </div>
        )
    }
})
