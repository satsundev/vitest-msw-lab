<template>
    <div class="products-grid">
        <h2 style="color: white;">Products</h2>

        <!-- Loading state -->
        <div v-if="loading" class="loading">
            Loading products...
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="error">
            Error: {{ error }}
        </div>

        <!-- Products table -->
        <div v-else class="table-container">
            <table class="products-table" role="table">
                <thead role="rowgroup">
                    <tr role="row">
                        <th role="columnheader">ID</th>
                        <th role="columnheader">Image</th>
                        <th role="columnheader">Title</th>
                        <th role="columnheader">Category</th>
                        <th role="columnheader">Brand</th>
                        <th role="columnheader">Price</th>
                        <th role="columnheader">Discount</th>
                        <th role="columnheader">Rating</th>
                        <th role="columnheader">Stock</th>
                        <th role="columnheader">Description</th>
                    </tr>
                </thead>
                <tbody role="rowgroup">
                    <tr v-for="product in products" :key="product.id" role="row">
                        <td role="cell">{{ product.id }}</td>
                        <td role="cell">
                            <img :src="product.thumbnail" :alt="product.title" class="product-image" />
                        </td>
                        <td class="product-title" role="cell-title">{{ product.title }}</td>
                        <td role="cell">{{ product.category }}</td>
                        <td role="cell">{{ product.brand }}</td>
                        <td class="price" role="cell">${{ product.price }}</td>
                        <td class="discount" role="cell">{{ product.discountPercentage }}%</td>
                        <td class="rating" role="cell">⭐ {{ product.rating }}</td>
                        <td class="stock" :class="{ 'low-stock': product.stock < 10 }" role="cell">
                            {{ product.stock }}
                        </td>
                        <td class="description" role="cell">{{ product.description }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination info -->
        <div v-if="!loading && !error" class="pagination-info">
            Showing {{ products.length }} of {{ total }} products
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'MyGrid',
    setup() {
        const products = ref([])
        const loading = ref(false)
        const error = ref(null)
        const total = ref(0)

        const fetchProducts = async () => {
            loading.value = true
            error.value = null

            try {
                const response = await fetch('https://dummyjson.com/products')

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                products.value = data.products
                total.value = data.total
            } catch (err) {
                error.value = err.message
                console.error('Error fetching products:', err)
            } finally {
                loading.value = false
            }
        }

        onMounted(() => {
            fetchProducts()
        })

        return {
            products,
            loading,
            error,
            total
        }
    }
}
</script>

<style scoped>
.products-grid {
    padding: 1rem;
    max-width: 100%;
    overflow-x: auto;
}

.products-grid h2 {
    margin-bottom: 1rem;
    color: #333;
}

.loading,
.error {
    text-align: center;
    padding: 2rem;
    font-size: 1.1rem;
}

.error {
    color: #e74c3c;
    background-color: #fdf2f2;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
}

.table-container {
    overflow-x: auto;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.products-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    min-width: 1200px;
}

.products-table th,
.products-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
    color: black;
}

.products-table th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #333;
    position: sticky;
    top: 0;
    z-index: 1;
}

.products-table tr:hover {
    background-color: #f8f9fa;
}

.product-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
}

.product-title {
    font-weight: 500;
    max-width: 200px;
}

.price {
    font-weight: 600;
    color: #27ae60;
}

.discount {
    color: #e74c3c;
    font-weight: 500;
}

.rating {
    color: #f39c12;
}

.stock {
    font-weight: 500;
}

.stock.low-stock {
    color: #e74c3c;
}

.description {
    max-width: 300px;
    font-size: 0.9rem;
    color: #666;
    line-height: 1.4;
}

.pagination-info {
    margin-top: 1rem;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
}

/* Responsive design */
@media (max-width: 768px) {
    .products-grid {
        padding: 0.5rem;
    }

    .products-table th,
    .products-table td {
        padding: 8px;
        font-size: 0.9rem;
    }

    .product-image {
        width: 40px;
        height: 40px;
    }

    .description {
        max-width: 200px;
        font-size: 0.8rem;
    }
}
</style>