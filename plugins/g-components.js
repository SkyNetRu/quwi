import Vue from 'vue'
import Navbar from '../components/Navbar'

const GComponents = { Navbar }

Object.entries(GComponents).forEach(([name, component]) => {
  Vue.component(name, component)
})
