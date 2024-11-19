const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    signIN: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },

    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-Product`,
        method: "post"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCart`,
        method: "get"
    },
    addToCartViewProduct: {
        url: `${backendDomain}/api/cart-product-view`,
        method: "get"
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete`,
        method: "post"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get"
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    },
    getPlaymentLink: {
        url: `${backendDomain}/api/get-payment-link`,
        method: "post"
    },
    getPriceRange: {
        url: (category) => `${backendDomain}/api/price-range/${category}`,
        method: "get"
    },

}

export default SummaryApi