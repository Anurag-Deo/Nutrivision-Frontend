"use client";
import { useState } from "react";
import axios from "axios";
import ImageUploading from "react-images-uploading";

export default function Home() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [images, setImages] = useState([]);
    const [dishName, setDishName] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [nutritionalInfo, setNutritionalInfo] = useState([]);
    const maxNumber = 69;

    const Capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleUpload = async () => {
        setDishName([]);
        setNutritionalInfo([]);
        setLoading(true);
        setError(null);
        try {
            for (let i = 0; i < images.length; i++) {
                const formData = new FormData();
                formData.append("image", images[i].file);
                const response = await axios.post(
                    "http://localhost:8003/detect",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log("response", response);
                // setDishName(response.data.dish);
                // Add response to dishName array
                setDishName((dishName) => [...dishName, response.data.dish]);
                console.log("formData2");
                let dishes = response.data.dish;
                // Create a json object to send to the nutritional_info service
                let bodyContent = JSON.stringify({
                    dish: "chole",
                });
                let headersList = {
                    "Content-Type": "application/json",
                };
                let reqOptions = {
                    url: "http://localhost:8001/nutritional_info",
                    method: "POST",
                    headers: headersList,
                    data: bodyContent,
                };

                let response2 = await axios.request(reqOptions);
                console.log("response2", response2.data);
                setNutritionalInfo((nutritionalInfo) => [
                    ...nutritionalInfo,
                    response2.data,
                ]);
            }
        } catch (error) {
            setError("Error uploading image or detecting dish.");
        }
        setLoading(false);
    };

    return (
        // <div>
        //     <input type="file" accept="image/*" onChange={handleImageChange} />
        //     <button onClick={handleUpload} disabled={!selectedImage || loading}>
        //         Upload
        //     </button>
        //     {console.log(selectedImage)}
        //     {loading && <p>Loading...</p>}
        //     {error && <p>{error}</p>}
        //     {dishName && <p>Dish Detected: {dishName}</p>}
        // </div>
        <div className="App">
            <h1 class="text-5xl text-white font-bold text-center mt-5">
                NutriVision
            </h1>
            <h2 class="text-2xl text-white font-bold text-center mt-5">
                An AI enabled nutrition tracker
            </h2>
            <ImageUploading
                multiple
                value={images}
                withIcon={true}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <div class="flex items-center justify-around w-full mt-4">
                        {/* <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button> */}
                        {console.log(images[0] && images[0].file)}
                        <div>
                            <section class="container w-full items-center pt-32 pb-8">
                                <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                                    <div class="px-4 py-6">
                                        <div
                                            id="image-preview"
                                            class="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                                            onClick={onImageUpload}
                                            {...dragProps}
                                        >
                                            {/* <input id="upload" type="file" class="hidden" accept="image/*" /> */}
                                            <label
                                                for="upload"
                                                class="cursor-pointer"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    class="w-8 h-8 text-gray-700 mx-auto mb-4"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                                    />
                                                </svg>
                                                <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700">
                                                    Upload picture
                                                </h5>
                                                <p class="font-normal text-sm text-gray-400 md:px-6">
                                                    Choose photo size should be
                                                    less than{" "}
                                                    <b class="text-gray-600">
                                                        2mb
                                                    </b>
                                                </p>
                                                <p class="font-normal text-sm text-gray-400 md:px-6">
                                                    and should be in{" "}
                                                    <b class="text-gray-600">
                                                        JPG, PNG, or GIF
                                                    </b>{" "}
                                                    format.
                                                </p>
                                                <span
                                                    id="filename"
                                                    class="text-gray-500 bg-gray-200 z-50"
                                                ></span>
                                            </label>
                                        </div>
                                        <div class="flex items-center justify-center">
                                            <div class="w-full">
                                                <label
                                                    class="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"
                                                    onClick={handleUpload}
                                                    // {...dragProps}
                                                >
                                                    <span class="text-center ml-2">
                                                        Upload
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            &nbsp;
                            {/* <button onClick={onImageRemoveAll}>
                            Remove all images
                        </button> */}
                            <label class="w-44 mx-[25%] text-white bg-[#111111] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mb-2 cursor-pointer">
                                <span
                                    class="text-center ml-2"
                                    onClick={onImageRemoveAll}
                                >
                                    Remove All Images
                                </span>
                            </label>
                        </div>
                        <div class="flex justify-around items-center flex-wrap w-1/2">
                            {imageList.map((image, index) => (
                                <div key={index} class="w-1/3">
                                    <img
                                        src={image["data_url"]}
                                        alt=""
                                        width={150}
                                    />
                                    {/* <div className="image-item__btn-wrapper">
                                        <button
                                            onClick={() => onImageUpdate(index)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => onImageRemove(index)}
                                        >
                                            Remove
                                        </button>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {/* {dishName && <p>Dishes Detected: {dishName}</p>} */}
            {/* List all the dishes from dishName with proper styling */}
            <div class="flex flex-col justify-around my-10">
                {dishName.length && (
                    <div class="text-2xl mx-auto mb-5">Dishes Detected</div>
                )}
                <div class="flex flex-row justify-around">
                    {dishName.map((dish, index) => (
                        <div
                            key={index}
                            class="text-white bg-[#111111]  focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-lg px-11 py-3.5 flex items-center justify-center mb-2 cursor-pointer"
                        >
                            <p>{Capitalize(dish)}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div class="overflow-x-auto mx-auto rounded-lg">
                {nutritionalInfo.length && (
                    <div class="text-2xl text-center mb-5">
                        Nutritional Information
                    </div>
                )}
                <div class="flex flex-row justify-around flex-wrap gap-y-10 w-[95vw] mx-auto">
                    {nutritionalInfo.map((nutrient, index) => (
                        <table class="w-[30%] text-sm text-left text-gray-500 dark:text-gray-400 mb-10">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-4 py-3 text-center"
                                        colSpan={3}
                                    >
                                        Nutrients for {dishName[index]}
                                    </th>
                                </tr>
                                <tr class="text-xs capitalize text-gray-700 bg-gray-50 dark:bg-[#111111] dark:text-gray-400">
                                    <th
                                        scope="col"
                                        class="px-4 py-3 text-center"
                                        colSpan={3}
                                    >
                                        Serving Size: {nutrient["serving"]}
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col" class="px-4 py-3">
                                        Nutrient
                                    </th>
                                    <th scope="col" class="px-4 py-3">
                                        Value
                                    </th>
                                    <th scope="col" class="px-4 py-3">
                                        Daily Value (%)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(nutrient["nutritional_data"]).map(
                                    (nutrientName) => {
                                        console.log(nutrientName);
                                        return (
                                            <tr
                                                key={nutrientName}
                                                className="border-b dark:border-gray-700"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {nutrientName}
                                                </th>
                                                <td className="px-4 py-3">
                                                    {
                                                        nutrient[
                                                            "nutritional_data"
                                                        ][nutrientName].value
                                                    }
                                                </td>
                                                <td className="px-4 py-3">
                                                    {
                                                        nutrient[
                                                            "nutritional_data"
                                                        ][nutrientName]
                                                            .percentage
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    ))}
                </div>
            </div>
        </div>
    );
}
