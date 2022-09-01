import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        return () => (
            <div class={t.app}>
                <want-icon name='function'></want-icon>
                <want-space justify=''>
                    <want-button>space 间距1</want-button>
                    <want-button>space 间距2</want-button>
                    <want-button>space 间距3</want-button>
                    <want-button>space 间距4</want-button>
                    <want-button>space 间距5</want-button>
                </want-space>
            </div>
        )
    }
})
