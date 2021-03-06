import React, { Component } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import './styles.css'
import { ipcRenderer } from 'electron'

export default class Main extends Component {

    state = {
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount () {
        this.loadProducts()
    }

    loadProducts = async (page = 1) => {
        ipcRenderer.send('get-products-page-request', page)
        ipcRenderer.on('get-products-page-response', (event, response) => {
            const { docs, ...productInfo } = response
            this.setState({ page, products: docs, productInfo })
        })
    }

    prevPage = () => {
        const { page } = this.state
        if (page === 1) return
        this.loadProducts(page - 1)
    }

    nextPage = () => {
        const { page, productInfo } = this.state
        if (page === productInfo.pages) return
        this.loadProducts(page + 1)
    }

    render () {
        const { products, page, productInfo } = this.state
        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próximo</button>
                </div>
            </div>
        )
    }
}