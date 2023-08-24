import axios from 'axios'
import { useState } from "react";
import {
  validateTitle,
  validateDescription,
  validateImage,
  validateSizes,
  validateCategory,
  validateColors,
  validateStock,
  validateGenre,
  validatePrice,
  validateRating,
  validateDiscount,
} from "../CreateProduct/helpers/ProductValidation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { editProduct } from "../../actions/index";
import { useNavigate, useParams } from "react-router-dom";
import Category from "../CreateProduct/Category";
import Sizes from "../CreateProduct/Sizes";
import Colors from "../CreateProduct/Colors"
import Genre from "../CreateProduct/Genre";
import { getDetail, clearDetail } from "../../redux/slices/detailSlice";


import {
  categories,
  genres,
  colors,
  shoesSize,
  hoodiesSize,
  crewnecksSize,
  tShirtsSize,
  beanieHatsSize,
  pantsSize,
  jacketsSize,
} from "../CreateProduct/helpers/FormHelpers";

const categoryToSizeMap = {
  Shoes: shoesSize,
  Hoodies: hoodiesSize,
  Crewnecks: crewnecksSize,
  "T-Shirts": tShirtsSize,
  "Beanie/Hats": beanieHatsSize,
  Pants: pantsSize,
  Jackets: jacketsSize,
};

const EditedProduct = () => {

    const { id } = useParams();
    const detail = useSelector((state) => state.detail.detail); // Accede a state.detail.detail
    const dispatch = useDispatch();
    const history = useNavigate();
    console.log(detail);

    const fetchDetail = () => {
        return async function (dispatch) {
          try {
            const json = await axios.get(`http://localhost:3001/api/products/${id}`);
            const detail = json.data;
            return dispatch(getDetail(detail));
          } catch (error) {
            console.error("Error fetching detail:", error);
          }
        };
      };

      useEffect(() => {
        dispatch(fetchDetail());
        return () => {
          dispatch(clearDetail());
        };
      }, [dispatch, id]);

  const [input, setInput] = useState({
    title: '',
    description: '',
    category: '',
    size: [],
    genre: '',
    color: [],
    image: '',
    stock: 0,
    price: 0,
    discount: 0,
    rating: 0,
  });

  useEffect(() => {
    if (detail) {
        const calculateAverageRating = (ratings) => {
            if (!ratings || ratings.length === 0) {
              return 0;
            }
          
            const sum = ratings.reduce((total, rating) => total + rating, 0);
            const average = sum / ratings.length;
            return average;
          };
          const averageRating = calculateAverageRating(detail.rating);
        console.log(averageRating);

      setInput({
        title: detail.title,
        description: detail.description,
        category: detail.category,
        size: detail.size,
        genre: detail.genre,
        color: detail.color,
        image: detail.image,
        stock: detail.stock,
        price: detail.price,
        discount: detail.discount,
        rating: averageRating
      });
    }
    
  }, [detail]);

  console.log(input);

  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
    size: [],
    genre: "",
    color: [],
    image: "",
    stock: "",
    price: "",
    discount: "",
    rating: "",
  });

  const [descriptionLength, setDescriptionLength] = useState(0);
  const maxDescriptionLength = 255;

  const handleTitleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      title: validateDescription(value),
    }));
  };

  const handleDescriptionChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: validateDescription(value),
    }));
    setDescriptionLength(value.length);
  };

  const handleImageChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      image: validateImage(value),
    }));
  };

  const handleCategoryChange = (selectedCategory) => {
    setInput((prevInput) => ({
      ...prevInput,
      category: selectedCategory,
      size: [],
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      category: validateCategory(selectedCategory),
    }));
  };

  const handleGenreChange = (selectedGenre) => {
    setInput((prevInput) => ({
      ...prevInput,
      genre: selectedGenre,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      genre: validateGenre(selectedGenre),
    }));
  };

  const handleSizeChange = (selectedSize) => {
    setInput((prevInput) => ({
      ...prevInput,
      size: [...prevInput.size, selectedSize], // Usa el operador de propagación para agregar la nueva talla al array
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      size: validateSizes([...input.size, selectedSize]), // Pasa el nuevo array a la función de validación
    }));
  };

  function handleDeleteSize(element) {
    const newSizes = input.size.filter((size) => size !== element); // Usa filter para crear un nuevo array sin la talla eliminada
  
    setInput((prevInput) => ({
      ...prevInput,
      size: newSizes,
    }));
  }

  const handleColorChange = (selectedColor) => {
    setInput((prevInput) => ({
      ...prevInput,
      color: [...prevInput.color, selectedColor], // Usa el operador de propagación para agregar el nuevo color al array
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      color: validateColors([...input.color, selectedColor]), // Pasa el nuevo array a la función de validación
    }));
  };

  function handleDeleteColor(element) {
    const newColors = input.color.filter((color) => color !== element); // Usa filter para crear un nuevo array sin el color eliminado
  
    setInput((prevInput) => ({
      ...prevInput,
      color: newColors,
    }));
  }

  // //****************************************************************** */
  const handleStockChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: parseFloat(value),
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      stock: validateStock(value),
    }));
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: parseFloat(value),
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      price: validatePrice(value),
    }));
  };

  const handleDiscountChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: parseFloat(value),
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      discount: validateDiscount(value),
    }));
  };

  const handleRatingChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: parseInt(value),
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      rating: validateRating(value),
    }));
  };
  //***************************************************************** */

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    const fieldErrors = {
      title: validateTitle(input.title),
      description: validateDescription(input.description),
      category: validateCategory(input.category),
      size: validateSizes(input.size),
      genre: validateGenre(input.genre),
      color: validateColors(input.color),
      image: validateImage(input.image),
      stock: validateStock(input.stock),
      price: validatePrice(input.price),
      discount: validateDiscount(input.discount),
      rating: validateRating(input.rating),
    };

    setErrors(fieldErrors);

    const hasErrors = Object.values(fieldErrors).some((error) => error !== "");

    if (hasErrors) {
      return;
    }

    const updatedInput = {
      ...input,
      size: input.size.map((size) => size.toString()),
      color: input.color.map((color) => color.toString()),
      rating: [input.rating],
    };

    dispatch(editProduct(id, updatedInput));
    alert("Product Edited Successfully");

    setInput({
      title: "",
      description: "",
      category: "",
      size: [],
      genre: "",
      color: [],
      image: "",
      stock: 0,
      price: 0,
      discount: 0,
      rating: 0,
    });
    history("/");
  }

  return (
    <div className="h-screen overflow-y-auto justify-center items-start md:inset-0 md:h-full dark:bg-neutral-950 flex">
      <div className="relative p-4 max-w-2xl h-screen md:h-auto font-general-sans w-full ">
        {/* <!-- content --> */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-zinc-950 sm:p-5 pb-[100px]">
          {/* <!--  header --> */}
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit Product
            </h3>
          
          </div>
          {/* <!--  body --> */}
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={input.title}
                  name="title"
                  id="title"
                  placeholder="Type product name"
                  onChange={handleTitleChange}
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-sm rounded-lg block w-full p-2.5  dark:bg-stone-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required=""
                />
                {errors.title && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.title}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <Category
                  categories={categories}
                  selectedCategory={input.category}
                  onSelectCategory={handleCategoryChange}
                />
                {errors.category && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.category}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="genre"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Genre
                </label>
                <Genre
                  genres={genres}
                  selectedGenre={input.genre}
                  onSelectGenre={handleGenreChange}
                />
                {errors.genre && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.genre}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="size"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Sizes
                </label>
                <Sizes
                  sizes={categoryToSizeMap[input.category] || []}
                  selectedSize={input.size}
                  onSelectSize={handleSizeChange}
                />
                {errors.size && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.size}
                  </div>
                )}
                <div className="w-[auto] h-[auto] mt-[8px] flex gap-2 justify-start items-center flex-wrap">
                  {input.size && input.size.map((size, index) => (
                    <div
                      key={index}
                      className=""
                      onClick={() => handleDeleteSize(size)}
                    >
                      <button
                        type="button"
                        className="border-none bg-black p-1 px-2 min-w-[50px] rounded-lg text-white"
                      >
                        {size}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="color"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Color
                </label>
                <Colors
                  color={colors}
                  selectedColor={input.color}
                  onSelectColor={handleColorChange}
                />
                {errors.color && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.color}
                  </div>
                )}
                <div className="w-[auto] h-[auto] mt-[8px] flex gap-2 justify-start items-center flex-wrap">
                  {input.color && input.color.map((color, index) => (
                    <div
                      key={index}
                      className=""
                      onClick={() => handleDeleteColor(color)}
                    >
                      <button
                        type="button"
                        className="border-none bg-black p-1 px-2 min-w-[50px] rounded-lg text-white"
                      >
                        {color}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="file"
                  value={input.image}
                  name="image"
                  id="image"
                  placeholder="Enter the image URL of the product"
                  onChange={handleImageChange}
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-sm rounded-lg block w-full p-2.5  dark:bg-stone-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required=""
                />
                {errors.image && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.image}
                  </div>
                )}
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  value={input.description}
                  name="description"
                  id="description"
                  rows="4"
                  placeholder="Write product description here"
                  onChange={handleDescriptionChange}
                  maxLength={maxDescriptionLength}
                  className="block p-2.5 w-full text-sm text-gray-900 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 bg-gray-50 rounded-lg border border-gray-300 dark:bg-stone-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
                {errors.description && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.description}
                  </div>
                )}
                <span className="flex justify-end dark:text-white">
                  {`${descriptionLength}/${maxDescriptionLength}`}
                </span>
              </div>
              <div>
                <label
                  htmlFor="stock"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={input.stock}
                  autoComplete="off"
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-sm rounded-lg  block w-full p-2.5 dark:bg-stone-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  onChange={handleStockChange}
                  placeholder="999"
                  required=""
                />
                {errors.stock && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.stock}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={input.price}
                  autoComplete="off"
                  onChange={handlePriceChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-sm rounded-lg  block w-full p-2.5 dark:bg-stone-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="$2999"
                  required=""
                />
                {errors.price && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.price}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="discount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Discount
                </label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  value={input.discount}
                  autoComplete="off"
                  onChange={handleDiscountChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-sm rounded-lg  block w-full p-2.5 dark:bg-stone-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="99%"
                  required=""
                />
                {errors.discount && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.discount}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rating
                </label>
                <input
                  type="number"
                  name="rating"
                  id="rating"
                  value={input.rating}
                  autoComplete="off"
                  onChange={handleRatingChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 text-sm rounded-lg  block w-full p-2.5 dark:bg-stone-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="1/5"
                  required=""
                />
                {errors.rating && (
                  <div className="mb-3 text-normal text-red-500 ">
                    {errors.rating}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-white inline-flex items-center bg-black hover:bg-neutral-900 focus:ring-4 focus:outline-none focus:ring-neutral-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-black dark:bg-gray-200 dark:hover:bg-white"
              >
                Edit product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditedProduct;