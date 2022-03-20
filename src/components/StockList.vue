<template>
    <h1>Gentle Possel - 639567</h1>
</template>

<script>
export default {
    name: 'StockList',
    data()
        {
            return {
                    stocks: [
                    { name: "BMW", price: 61.05, previousPrice: 0, currency: "€" },
                    { name: "Caterpillar", price: 146.49, previousPrice: 0, currency: "$" },
                    { name: "AMD", price: 76.5, previousPrice: 0, currency: "$" },
                    { name: "Gazprom", price: 4.583, previousPrice: 0, currency: "$" },
                    ],
                    portfolio: [],
        
        }
   }
}
</script>

<style>

</style>