import { computed, defineComponent, reactive, ref, withModifiers } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {

        return () => (
            <div class={t.app}>
                <want-swiper loop autoplay>
                    <want-swiper-item style={{height:'200px',background:'lightblue'}}>1</want-swiper-item>
                    <want-swiper-item style={{height:'200px',background:'lightgreen'}}>2</want-swiper-item>
                    <want-swiper-item style={{height:'200px',background:'lightyellow'}}>3</want-swiper-item>
                    <want-swiper-item style={{height:'200px',background:'lightpink'}}>4</want-swiper-item>
                    <want-swiper-item style={{height:'200px',background:'cyan'}}>5</want-swiper-item>
                    <want-swiper-item style={{height:'200px',background:'lightsalmon'}}>6</want-swiper-item>
                </want-swiper>
            </div>
        )
    }
})
