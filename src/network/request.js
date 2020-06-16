import Vue from 'vue'
import axios from 'axios'

const http = axios.create({
    baseURL: 'http://192.168.43.39:8888'
})
export default http