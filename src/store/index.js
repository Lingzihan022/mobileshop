
import { createStore } from 'vuex'

const store = createStore({
    state: {

        cartList: []

    },
    mutations: {
        // 还需要对payload添加的商品进行判断 看cartList里面是已经存在这个商品,如果直接在mutations中执行 则需要做两件事，无法对count跟踪，
        // 因此选择在actions里面进行判断。
        // 
        addCounter(state, payload) {
            payload.count++;
        },
        addToCart(state, payload) {
            state.cartList.push(payload);
        }
    }, actions: {
        // context是和store实例有相同方法，属性的context对象，可以调用context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters
        addCart(context, payload) {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid && item.colorParams === payload.colorParams && item.sizeParams === payload.sizeParams)
            if (oldProduct) {
                context.commit('addCounter', oldProduct);
            } else {
                payload.count = 1
                context.commit('addToCart', payload);
            }


        }
    }
})
export default store;
// 数组常用的方法有哪些
// map,each,keys,length,filter,pop,push,shift,splice,indexOf,unshift,sort,reverse,join