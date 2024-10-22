import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalProductCart from '../components/VerticalProductCart';
import SummaryApi from '../common';

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

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCL
      })
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked
      };
    });
  };

  useEffect(() => {
    fetchData();
  }, [filterCL]);

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
        <div className='bg-white p-2 min-h-[calc(115vh-200px)] overflow-y-scroll'>
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