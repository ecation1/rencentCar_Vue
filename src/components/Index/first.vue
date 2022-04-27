<template>
    <div>
    <SfProductCard
            image="https://docs.storefrontui.io/assets/storybook/Home/productB.jpg"
            :imageWidth="216"
            :imageHeight="326"
            badgeLabel=""
            badgeColor=""
            title="Cotton Sweater"
            linkTag=""
            :scoreRating="3"
            :reviewsCount="7"
            :maxRating="5"
            regularPrice=""
            specialPrice=""
            wishlistIcon="heart"
            isInWishlistIcon="heart_fill"
            :isInWishlist="enjoy"
            showAddToCartButton
            @click:wishlist="wish"
            @click:add-to-cart="add"
    />
    <template>
        <SfIcon
                icon="heart_fill"
                size="lg"
                color="green-primary"
                viewBox="0 0 24 24"
                :coverage="1"
        />
    </template>
        <SfCard
                image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                :imageWidth="288"
                :imageHeight="189"
                title="Baby Care"
                :titleLevel="3"
                description="Read how to take care of your baby, see our products available, clothes and suggestions how stay healthy."
                link=""
                buttonText="Learn more"
        />
    </div>
</template>
<!--@click:add-to-cart="add"-->
<script>
    import {
        SfButton,
        SfCard,
        SfProductCard,
        SfIcon
    } from "@storefront-ui/vue";
    export default {
        name: "first",
        components: {
            SfButton,
            SfProductCard,
            SfCard,
            SfIcon
        },
        data() {
            return{
                enjoy:false
            }
        },
        methods:{
            add(){
                console.log("123")
            },
            wish(){
                this.enjoy=!this.enjoy
            }
        }
    }
</script>

<style scoped>

</style>