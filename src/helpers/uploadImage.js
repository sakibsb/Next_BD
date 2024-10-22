const url = `https://api.cloudinary.com/v1_1/dwh8uktt9/image/upload`;

const uploadImage = async (image) => {
    try {
        // Creating FormData to hold the image file and other Cloudinary parameters
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "mern_product"); // Set Cloudinary upload preset

        // Making the API request to Cloudinary
        const dataResponse = await fetch(url, {
            method: "POST",
            body: formData,
        });

        // Checking if the response is successful
        if (!dataResponse.ok) {
            throw new Error("Failed to upload image");
        }

        // Returning the parsed JSON response
        return await dataResponse.json();
    } catch (error) {
        // Logging error and returning an appropriate message
        console.error("Error uploading image:", error);
        throw error;
    }
};

export default uploadImage;
