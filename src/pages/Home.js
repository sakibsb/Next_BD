import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      

      <CategoryList />

      <BannerProduct/>

      <VerticalCardProduct category={"books"} heading={"Best Selling Books"} />

      <VerticalCardProduct category={"books"} heading={"সেরা ডিস্কাউন্ট এ বেস্টসেলার বই"} />

      <VerticalCardProduct category={"books"} heading={"Recently Sold Products"} />

      <VerticalCardProduct category={"books"} heading={"শুধুই আপনার জন্য"} />

      <HorizontalCardProduct category={"watches"} heading={"Best Watches"} />

      <HorizontalCardProduct category={"camera"} heading={"Popular Cameras"} />

      <VerticalCardProduct category={"mobiles"} heading={"Best Rated Mobiles"} />

      <CategoryList />

      <HorizontalCardProduct category={"airpodes"} heading={"Best Selling Airpodes"} />

      <VerticalCardProduct category={"mouse"} heading={"Mouses to Watch"} />

      <VerticalCardProduct category={"earphones"} heading={"Top Rated Earphones"} />

      <HorizontalCardProduct category={"processor"} heading={"Processor"} />

      <VerticalCardProduct category={"television"} heading={"Televisions"} />

      <VerticalCardProduct category={"speakers"} heading={"Speakers"} />

      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />

      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />

      <HorizontalCardProduct category={"printers"} heading={"Printers"} />

    </div>
  )
}

export default Home
