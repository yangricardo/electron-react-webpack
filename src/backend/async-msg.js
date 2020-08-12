const { ipcMain } = require('electron')

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)
  event.sender.send('asynchronous-reply', 'pong')
})


import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rocketseat-node.herokuapp.com/api'
})

ipcMain.on('get-products-page-request', async (event, page) => {
  const response = await api.get(`/products?page=${page}`)
  event.sender.send('get-products-page-response', response.data)
})


export default api