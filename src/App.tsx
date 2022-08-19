import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        const slots = {
            leftActions: () => {
                return <want-button square type='primary'>置顶</want-button>
            },
            rightActions: () => {
                return <>
                    <want-button square>取消关注</want-button>
                    <want-button square type='warning'>免打扰</want-button>
                    <want-button square type='danger'>删除</want-button>
                </>
            }
        }
        return () => (
            <div class={t.app}>
                <want-swipe-action v-slots={slots}>
                    <div class={t.item} >撒打算</div>
                </want-swipe-action>
            </div>
        )
    }
})
