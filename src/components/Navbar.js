import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    // Expanded data for main categories and subcategories
    const categories = [
        {
            name: "বই",
            subcategories: ["উপন্যাস", "কবিতা", "কমিকস", "পাঠ্যবই", "জীবনী"],
        },
        {
            name: "ইলেকট্রনিকস",
            subcategories: ["টিভি", "ফ্রিজ", "মোবাইল", "ল্যাপটপ", "ড্রোন"],
        },
        {
            name: "ফ্যাশন",
            subcategories: ["পুরুষ", "নারী", "শিশু", "জুতা", "ব্যাগ"],
        },
        {
            name: "গৃহস্থালি সামগ্রী",
            subcategories: [
                "মাইক্রোওয়েভ",
                "এয়ার কন্ডিশনার",
                "ভ্যাকুয়াম ক্লিনার",
                "ওভেন",
                "ডিশওয়াশার",
            ],
        },
        {
            name: "খেলাধুলা",
            subcategories: ["ফুটবল", "ক্রিকেট", "ব্যাডমিন্টন", "জার্সি", "র্যাকেট"],
        },
        {
            name: "স্বাস্থ্যসেবা",
            subcategories: ["মাস্ক", "গ্লাভস", "ওষুধ", "স্যানিটাইজার", "থার্মোমিটার"],
        },
        {
            name: "সৌন্দর্য",
            subcategories: ["মেকআপ", "স্কিন কেয়ার", "চুলের পণ্য", "পারফিউম", "লোশন"],
        },
        {
            name: "খাবার",
            subcategories: ["ফলমূল", "শাকসবজি", "মশলা", "দুধ", "জুস"],
        },
        {
            name: "গাড়ি ও বাইক",
            subcategories: ["গাড়ি পার্টস", "বাইক পার্টস", "হেলমেট", "টায়ার", "অ্যাক্সেসরিজ"],
        },
        {
            name: "শিশুদের পণ্য",
            subcategories: ["টয়", "পোশাক", "ডাইপার", "ফিডার", "শিক্ষামূলক খেলনা"],
        },
    ];

    const [activeCategory, setActiveCategory] = useState(null);

    return (
        <div>
            {/* Main Navbar */}
            <nav className="bg-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center flex-wrap">
                    <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() =>
                                    setActiveCategory(
                                        activeCategory?.name === category.name ? null : category
                                    )
                                }
                                className={`text-black px-4 py-2 rounded-md text-lg font-medium transition-all duration-300 ${activeCategory?.name === category.name
                                    ? "bg-blue-300 text-black"
                                    : "hover:bg-blue-200 hover:text-black"
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Subcategory Section */}
            {activeCategory && (
                <nav className="bg-gray-100 p-3 shadow-inner border-t border-gray-300">
                    <div className="container mx-auto flex justify-between items-center flex-wrap">
                        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
                            {activeCategory.subcategories.map((subcategory, index) => (
                                <Link
                                    key={index}
                                    to={`/subcategory/${subcategory.toLowerCase()}`}
                                    className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-base font-normal transition-all duration-300"
                                >
                                    {subcategory}
                                </Link>
                            ))}
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default Navbar;