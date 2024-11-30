const backendDomain = "http://localhost:8080"; // Ensure backend is running here

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "POST"
    },
    signIN: {
        url: `${backendDomain}/api/signin`,
        method: "POST"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "GET"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "GET"
    },
    becomeSeller: {
        url: `${backendDomain}/api/sellers/become-seller`, // Ensure this API route exists in backend
        method: "POST",
    },
    getSellerRequests: {
        url: `${backendDomain}/api/sellers/requests`,
        method: "GET",
    },
    updateSellerRequest: {
        url: (id) => `${backendDomain}/api/sellers/requests/${id}`,
        method: "PATCH",
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: "GET"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "POST"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "POST"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "GET"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "POST"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "GET"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-Product`,
        method: "POST"
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "POST"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "POST"
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCart`,
        method: "GET"
    },
    addToCartViewProduct: {
        url: `${backendDomain}/api/cart-product-view`,
        method: "GET"
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update`,
        method: "POST"
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete`,
        method: "POST"
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "GET"
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "POST"
    },
    getPaymentLink: {
        url: `${backendDomain}/api/get-payment-link`,
        method: "POST"
    },
    getPriceRange: {
        url: (category) => `${backendDomain}/api/price-range/${category}`,
        method: "GET"
    },
}

export default SummaryApi;