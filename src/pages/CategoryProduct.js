import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalProductCart from '../components/VerticalProductCart';
import SummaryApi from '../common';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';


const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");


  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach(el => {
    urlCategoryListObject[el] = true;
  });


  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCL, setFilterCL] = useState([]);
  const [sortBy, setSoryBy] = useState("");
  const [priceRangeObj, setPriceRangeObj] = useState([]) // [{categoryName, minPrice, maxPrice}]
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 0]) // [10, 100]
  const [priceRange, setPriceRange] = useState([]) // [minPrice, maxPrice]
  const prevCategoryListLength = useRef(0);

  // price range logic
  useEffect(() => {
    const currentLength = urlCategoryListInArray.length;
    const previousLength = prevCategoryListLength.current;

    if (currentLength < previousLength) {
      // Categories were removed
      const updatedPriceRangeObj = priceRangeObj.filter(price =>
        urlCategoryListInArray.includes(price.categoryName)
      );
      setPriceRangeObj(updatedPriceRangeObj);

      // Update selectedPriceRange with the new overall min and max prices
      if (updatedPriceRangeObj.length > 0) {
        const allMinPrices = updatedPriceRangeObj.map(item => item.minPrice);
        const allMaxPrices = updatedPriceRangeObj.map(item => item.maxPrice);
        setSelectedPriceRange([Math.min(...allMinPrices), Math.max(...allMaxPrices)]);
        setPriceRange([Math.min(...allMinPrices), Math.max(...allMaxPrices)]);
      } else {
        setSelectedPriceRange([]); // Reset if no categories remain
        setPriceRange([]); // Reset if no categories remain
      }
    } else if (currentLength > previousLength) {
      // Categories were added
      const newCategories = urlCategoryListInArray.filter(
        categoryName =>
          !priceRangeObj.some(price => price.categoryName === categoryName)
      );

      // create fetch function
      const fetchPriceDataByCategory = async (categoryName) => {
        // Simulated API call to fetch price range for the given category
        const res = await fetch(SummaryApi.getPriceRange.url(categoryName), {
          method: SummaryApi.getPriceRange.method,
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { data } = await res.json();
        return data;
      };

      // Fetch data for new categories
      newCategories.forEach(async (categoryName) => {
        const data = await fetchPriceDataByCategory(categoryName);

        setPriceRangeObj((state) => {
          const updatedPriceRange = [...state, data]

          // Update selectedPriceRange with the new overall min and max prices
          const allMinPrices = updatedPriceRange.map(item => item.minPrice);
          const allMaxPrices = updatedPriceRange.map(item => item.maxPrice);
          setSelectedPriceRange([Math.min(...allMinPrices), Math.max(...allMaxPrices)]);
          setPriceRange([Math.min(...allMinPrices), Math.max(...allMaxPrices)]);

          return updatedPriceRange
        });

      });
    }

    // Update the previous length
    prevCategoryListLength.current = currentLength;
  }, [urlCategoryListInArray, priceRangeObj]);



  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked
      };
    });
  };

  // product fetch based on category and price range
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          category: filterCL,
          minPrice: selectedPriceRange[0],
          maxPrice: selectedPriceRange[1]
        })
      });


      const dataResponse = await response.json();
      setData(dataResponse?.data || []);
    };

    fetchData();
  }, [filterCL, selectedPriceRange]);


  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName;
      }
      return null;
    }).filter(el => el);
    setFilterCL(arrayOfCategory);


    const urlFormat = arrayOfCategory.map((el, index) => {
      return `category=${el}` + (index < arrayOfCategory.length - 1 ? '&&' : '');
    });
    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  // sotring logic
  useEffect(() => {
    if (sortBy === "asc") {
      setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (sortBy === "dsc") {
      setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  }, [data, sortBy])


  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSoryBy(value);
  };


  // Use the useEffect to navigate back when the backspace key is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        event.preventDefault(); // Optional: Prevent the default behavior if needed
        navigate(-1); // Navigate back to the previous page
      }
    };


    window.addEventListener('keydown', handleKeyDown);


    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);


  return (
    <div className='container mx-auto p-4'>
      {/***Desktop Version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/***Left Part */}
        <div className='bg-white p-2 min-h-[calc(115vh-200px)] overflow-y-scroll space-y-8'>
          <div className=''>
            <h2 className='text-sm uppercase font-medium text-slate-500 border border-slate-300 justify-center text-center pb-1'>Sort By Price</h2>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3 font-bold'>
                <input type='radio' name='sort' value={"asc"} checked={sortBy === "asc"} onChange={handleOnChangeSortBy} />
                <label>Price - Low to High</label>
              </div>
              <div className='flex items-center gap-3 font-bold'>
                <input type='radio' name='sort' value={"dsc"} checked={sortBy === "dsc"} onChange={handleOnChangeSortBy} />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* price range */}
          <div>
            <h2 className='text-sm uppercase font-medium text-slate-500 border border-slate-300 justify-center text-center pb-1'>Price Range</h2>

            <div className='py2 flex flex-col gap-4 mt-2'>
              {/* Sliders */}
              <div className='space-y-3'>
                <div className='flex justify-between items-center'>
                  <small className='inline-block'>Min: {selectedPriceRange[0]}</small>
                  <small className='inline-block'>Max: {selectedPriceRange[1]}</small>
                </div>
                <RangeSlider
                  min={priceRange[0]}
                  max={priceRange[1]}
                  step={1}
                  value={selectedPriceRange}
                  onInput={setSelectedPriceRange}
                />
              </div>
            </div>
          </div>

          <div className=''>
            <h2 className='text-sm uppercase font-medium text-slate-500 border border-slate-300 justify-center text-center pb-1'>Category</h2>
            <form className='text-sm flex flex-col gap-2 py-2'>
              {
                productCategory.map((categoryName) => {
                  return (
                    <div className='flex items-center gap-3 font-semibold' key={categoryName?.value}>
                      <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName?.value}</label>
                    </div>
                  );
                })
              }
            </form>
          </div>
        </div>
        {/***Right Part */}
        <div className='px-4'>
          <p className='font-semibold text-blue-800 text-lg my-1 bg-white flex justify-center items-center w-auto'>Search Results: {data.length}</p>
          <div className='min-h-[calc(115vh-200px)] overflow-y-scroll max-h-[calc(115vh-200px)]'>
            {
              data.length !== 0 && (
                <VerticalProductCart data={data} loading={loading} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};


export default CategoryProduct;