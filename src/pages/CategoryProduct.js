import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalProductCart from '../components/VerticalProductCart';
import SummaryApi from '../common';
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const CategoryProduct = () => {
  const [searchParams] = useSearchParams() 
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
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 0]);

  const getPriceRange = useMemo(() => async (categorry) => {
    const res = await fetch(SummaryApi.getPriceRange.url(categorry), {
      method: SummaryApi.getPriceRange.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      setPriceRange([0, 0])
    }

    const { data } = await res.json()

    return [data.minPrice, data.maxPrice]
  }, [])

  useEffect(() => {
    const get = async() => {
      const allMinMaxPricePromise = urlCategoryListInArray.map((categorry) => getPriceRange(categorry))
      const allMinMax = await Promise.all(allMinMaxPricePromise)
      
      const minPrices = allMinMax.map(range => range[0]); // [9, 20]
      const maxPrices = allMinMax.map(range => range[1]); // [100, 300]
      // Find the overall minimum and maximum
      const overallMin = Math.min(...minPrices);
      const overallMax = Math.max(...maxPrices);

      setPriceRange([overallMin, overallMax])
      setSelectedPriceRange([overallMin, overallMax])
    }
    get()
    

    // getPriceRange(urlCategoryListInArray[0])
  }, [urlCategoryListInArray])


  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCL,
        minPrice: selectedPriceRange[0],
        maxPrice: selectedPriceRange[1] || 1000,
      })
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked
      };
    });
  };

  useEffect(() => {
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

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSoryBy(value);
    if (value === "asc") {
      setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  // const handleApplyPriceFilter = () => {
  //   const filteredData = data.filter(product => {
  //     return (
  //       product.sellingPrice >= minPrice && product.sellingPrice <= maxPrice
  //     );
  //   });
  //   setData(filteredData);
  // };

  // const resetPriceFilter = () => {
  //   setMinPrice("");
  //   setMaxPrice("");
  //   fetchData();
  // };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        event.preventDefault();
        navigate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  // const handleMinPriceChange = (e) => {
  //   const value = e.target.value;
  //   if (value === '' || /^[0-9]*$/.test(value)) {
  //     setMinPrice(value);
  //   }
  // };

  // const handleMaxPriceChange = (e) => {
  //   const value = e.target.value;
  //   if (value === '' || /^[0-9]*$/.test(value)) {
  //     setMaxPrice(value);
  //   }
  // };

  return (
    <div className='container mx-auto p-4'>
      {/***Desktop Version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/***Left Part */}
        <div className='bg-white p-2 min-h-[calc(115vh-200px)] overflow-y-scroll space-y-6'>
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

          <div className=''>
            <h2 className='text-sm uppercase font-medium text-slate-500 border border-slate-300 justify-center text-center pb-1'>Price Range</h2>
            <form className='text-sm py-2'>
              <div className='flex flex-col gap-4'>

                {/* Sliders */}
                <div className='space-y-3'>
                  <div className='flex justify-between items-center'>
                    <small className='inline-block'>Min: {selectedPriceRange[0]}</small>
                    <small className='inline-block'>Max: {selectedPriceRange[1]}</small>
                  </div>
                  <RangeSlider
                    min={priceRange[0]}
                    max={priceRange[1]}
                    step={10}
                    value={selectedPriceRange}
                    onInput={setSelectedPriceRange}
                  />
                </div>
              </div>


              {/* <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleApplyPriceFilter}
                  className="bg-blue-500 text-white p-2 mt-2 w-full"
                >
                  Apply Filter
                </button>
                <button
                  type="button"
                  onClick={resetPriceFilter}
                  className="bg-gray-300 text-black p-2 mt-2 w-full"
                >
                  Clear Filter
                </button>
              </div> */}
            </form>
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