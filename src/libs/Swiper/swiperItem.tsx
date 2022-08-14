import { defineComponent } from "vue";
import t from './swiperItem.module.scss'
export const swiperItem = defineComponent({
    props:{},
    setup(props,{slots}){
        return ()=>(<div class={[t['want-swiper-item'],'want-swiper-item']}>{slots.default?.()}</div>)
    }
})