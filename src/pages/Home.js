import React from 'react';
import Navbar from '../components/Navbar';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Category List */}
      <div className="my-2">
        <CategoryList />
      </div>

      {/* Banner Product */}
      <div className="my-6">
        <BannerProduct />
      </div>

      {/* Best Selling Books Section */}
      <div className="container mx-auto px-4">
        <VerticalCardProduct category="books" heading="সেরা বিক্রিত বই" />

        <VerticalCardProduct category="books" heading="শুধু আপনার জন্য" />
      </div>

      {/* Horizontal Product Sections */}
      <div className="container mx-auto px-4 my-8">
        <HorizontalCardProduct category="watches" heading="সেরা ঘড়ি" />
        <HorizontalCardProduct category="camera" heading="জনপ্রিয় ক্যামেরা" />
      </div>

      {/* Best Rated Mobiles Section */}
      <div className="container mx-auto px-4">
        <VerticalCardProduct category="mobiles" heading="সেরা রেটেড মোবাইল" />
      </div>
      <VerticalCardProduct category="books" heading="সেরা ছাড়ের সেরা বিক্রিত বই" />

      {/* More Product Sections with improved layout */}
      <div className="container mx-auto px-4 my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <VerticalCardProduct category="airpodes" heading="সেরা এয়ারপডস" />
        </div>
        <div className="col-span-1">
          <VerticalCardProduct category="mouse" heading="দেখার মতো মাউস" />
        </div>
        <div className="col-span-1">
          <VerticalCardProduct category="earphones" heading="শীর্ষ রেটেড ইয়ারফোন" />
        </div>
        <div className="col-span-1">
          <VerticalCardProduct category="television" heading="টেলিভিশন" />
        </div>
        <div className="col-span-1">
          <VerticalCardProduct category="speakers" heading="স্পিকার" />
        </div>
        <div className="col-span-1">
          <VerticalCardProduct category="trimmers" heading="ট্রিমার" />
        </div>
        <div className="col-span-1">
          <VerticalCardProduct category="books" heading="সেরা বিক্রিত বই" />
        </div>
        
        <div className="col-span-1">
          <HorizontalCardProduct category="watches" heading="সেরা ঘড়ি" />
        </div>
        <div className="col-span-1">
          <HorizontalCardProduct category="refrigerator" heading="রেফ্রিজারেটর" />
        </div>
        <div className="col-span-1">
          <HorizontalCardProduct category="printers" heading="প্রিন্টার" />
        </div>
        
      </div>
      <VerticalCardProduct category="books" heading="সাম্প্রতিক বিক্রয়" />
    </div>
  );
};

export default Home;