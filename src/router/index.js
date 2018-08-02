import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/pages/index/index')
const Lottery = () => import('@/pages/lottery/index')
const K3 = () => import('@/pages/lottery/k3/index')
const LHC = () => import('@/pages/lottery/lhc/index')
const SSC = () => import('@/pages/lottery/ssc/index')
const SYX5 = () => import('@/pages/lottery/syx5/index')
const PK10 = () => import('@/pages/lottery/pk10/index')
const FC3D = () => import('@/pages/lottery/fc3d/index')
const PCDD = () => import('@/pages/lottery/pcdd/index')

const Purchase = () => import('@/pages/purchase/index')

const test = () => import('@/pages/test/index')
const Login = () => import('@/pages/login/index')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/purchase',
      name: 'Purchase',
      component: Purchase
    },
    {
      path: '/lottery',
      name: 'Lottery',
      component: Lottery,
      redirect: '/lottery/ssc',
      children:[
        {
          path: 'k3/:id',
          name: 'K3',
          component: K3,
        },
        {
          path: 'lhc/:id',
          name: 'LHC',
          component: LHC,
        },
        {
          path: 'ssc/:id',
          name: 'SSC',
          component: SSC,
        },
        {
          path: 'pk10/:id',
          name: 'PK10',
          component: SSC,
        },
        {
          path: 'syx5/:id',
          name: 'SYX5',
          component: SSC,
        },
        {
          path: 'pcdd/:id',
          name: 'PCDD',
          component: SSC,
        },
        {
          path: 'fc3d/:id',
          name: 'FC3D',
          component: FC3D,
        },
        {
          path: 'pl3/:id',
          name: 'PL3',
          component: FC3D,
        },
        {
          path: 'kl8/:id',
          name: 'KL8',
          component: SSC,
        }
      ]
    }
  ]
})
