import { defineComponent, reactive, ref } from 'vue'
import t from './App.module.scss'
import { dialog } from '@/libs'
export const App = defineComponent({
    setup(props, context) {
        return () => (
            <div>
                <want-swiper >
                    <want-swiper-item>
                        <div style='height:20vh;background:lightblue'>1</div>
                    </want-swiper-item>
                    <want-swiper-item>
                        <div style='height:20vh;background:lightgreen'>2</div>
                    </want-swiper-item>
                    <want-swiper-item>
                        <div style='height:20vh;background:lightyellow'>3</div>
                    </want-swiper-item>
                    <want-swiper-item>
                        <div style='height:20vh;background:lightpink'>4</div>
                    </want-swiper-item>
                    <want-swiper-item>
                        <div style='height:20vh;background:lightsalmon'>5</div>
                    </want-swiper-item>
                </want-swiper>
            </div>
        )
    }
})
