import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import React from "react";

function Dashboard_Filter({
    filterOptions = {
        keyword: "",
        price: [500, 5000000],
    },
    setFilterOptions,
    handleFilterClear,
}) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterOptions({ ...filterOptions, [name]: value });
    };

    const handlePriceChange = (value) => {
        setFilterOptions({ ...filterOptions, price: value });
    };

    return (
        <div className="w-full bg-white p-3 rounded-lg shadow-md">
            <form>
                <div className="mb-3">
                    <label htmlFor="keyword" className="text-gray-700 font-semibold mb-1 block">
                        Search Currency
                    </label>
                    <input
                        type="text"
                        id="keyword"
                        name="keyword"
                        value={filterOptions.keyword}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md outline-none"
                        placeholder="Search by keyword..."
                    />
                </div>
            
            </form>
            <button
                onClick={handleFilterClear}
                className="w-full mt-3 py-2 text-white bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out rounded-md"
            >
                Clear Filters
            </button>
        </div>
    );
}

export default Dashboard_Filter;
