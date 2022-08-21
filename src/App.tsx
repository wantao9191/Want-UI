import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {

        return () => (
            <div class={t.app}>
                <want-swiper loop >
                    <want-swiper-item style={{ height: '100vh', background: 'lightblue' }}>1</want-swiper-item>
                    <want-swiper-item style={{ height: '100vh', background: 'lightgreen' }}>2</want-swiper-item>
                    <want-swiper-item style={{ height: '100vh', background: 'lightyellow' }}>3</want-swiper-item>
                    <want-swiper-item style={{ height: '100vh', background: 'lightpink' }}>4</want-swiper-item>
                    <want-swiper-item style={{ height: '100vh', background: 'cyan' }}>5</want-swiper-item>
                    <want-swiper-item style={{ height: '100vh', background: 'lightsalmon' }}>6</want-swiper-item>
                </want-swiper>
            </div>
        )
    }
})
