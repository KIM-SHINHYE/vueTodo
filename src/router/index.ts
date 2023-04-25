import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      // Todo.vue를 따로 만든게 아니므로 component부분은 삭제한다.
      // component: () => import('@/views/Todo.vue'),
      children:[
        // 자식 라우터에서는 /를 제외한 상대경로를 사용해야 함, 만약 /를 쓰려면 전부 다써줘야 함 
        {
          path: 'list', // /todo/list
          // path: '/todo/list', // /todo/list
          name: 'todo-list',
          component: () => import('@/views/TodoListView.vue')
        },
        {
          path: 'register', // /todo/register
          name: 'todo-register',
          component: () => import('@/views/TodoRegisterView.vue')
        }
      ]
    },
    // {
    //   path: '/todoregister',
    //   name: 'todoregister',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/TodoRegisterView.vue')
    // },
    // {
    //   path: '/todolist',
    //   name: 'todolist',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/TodoListView.vue')
    // },
    {
      path: '/user',
      name: 'user',
      children: [
        {
          path: 'list',
          name: 'user-list',
          component: () => import('@/views/UserListView.vue')
        },
        {
          path: 'register',
          name: 'user-register',
          component: () => import('@/views/UserRegisterView.vue')
        }
      ]
    },
    // {
    //   path: '/userregister',
    //   name: 'userregister',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/UserRegisterView.vue')
    // },
    // {
    //   path: '/userlist',
    //   name: 'userlist',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('@/views/UserListView.vue')
    // },
    {
      path: '/directive',
      name: 'directive',
      component: () => import('@/views/DirectiveView.vue')
    },
    {
      path: '/lifecycle',
      name: 'lifecycle',
      component: () => import('@/views/LifecycleView.vue')
    },
    {
      path: '/exchange',
      name: 'exchange',
      component: () => import('@/views/CurrencyExchangeView.vue')
    },
    {
      path: '/computed',
      name: 'computed',
      component: () => import('@/views/ComputedView.vue')
    },
    {
      path: '/watch',
      name: 'watch',
      component: () => import('@/views/WatchView.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('@/views/FaqView.vue')
    },
    {
      path: '/drilling',
      name: 'drilling',
      component: () => import('@/views/PropDrillingView.vue')
    },
    {
      path: '/promise',
      name: 'promise',
      component: () => import('@/views/PromiseView.vue')
    },
    {
      path: '/async-await',
      name: 'async-await',
      component: () => import('@/views/AsyncAwaitView.vue')
    },
    {
      path: '/openapi',
      name: 'openapi',
      component: () => import('@/views/OpenApiListView.vue')
    },
    {
      path: '/quasar',
      name: 'quasar',
      component: () => import('@/views/QuasarView.vue')
    },
    {
      path: '/newtodo',
      name: 'newtodo',
      component: () => import('@/views/NewTodoView.vue')
    },
    {
      path: '/board',
      name: 'board',
      children: [
        {
          path: 'detail/:id',
          name: 'board-detail',
          component: () => import('@/views/board/BoardListDetailView.vue'),
        },
        {
          path: 'list',
          name: 'board-list',
          component: () => import('@/views/board/BoardListView.vue'),
        },
        {
          path: 'register',
          name: 'board-register',
          component: () => import('@/views/board/BoardRegEditView.vue'),
        },
        {
          path: 'edit/:id',
          name: 'board-edit',
          component: () => import('@/views/board/BoardRegEditView.vue'),
        }
      ]
    }
  ]
})

export default router
