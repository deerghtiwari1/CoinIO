import { getUserToken } from "@/utils/getUserToken";
import { useState, useRef, useEffect } from "react";

const PriceAlertPopup = ({ coinData, onClose }) => {
    const [lowerBound, setLowerBound] = useState("");
    const [upperBound, setUpperBound] = useState("");
    const popupRef = useRef();

    const userId = getUserToken();

    const handleLowerBoundChange = (e) => {
        setLowerBound(e.target.value);
    };

    const handleUpperBoundChange = (e) => {
        setUpperBound(e.target.value);
    };

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (lowerBound && upperBound && isChecked) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/currency/setlimit`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: userId,
                            currencyId: coinData.id,
                            lower_bound: parseFloat(lowerBound),
                            upper_bound: parseFloat(upperBound),
                        }),
                    }
                );
                const data = await response.json();
                if (response.status === 200) {
                    console.log('Subscription success:', data);
                    alert(data.message);
                    onClose();
                } else {
                    console.error(`Failed with status code ${response.status}`);
                }
            }
        } catch (error) {
            console.error("Price alert subscription error:", error);
        }
    };

    const handleClickOutside = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      onClose();
    }
  };

    useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={popupRef} className="relative bg-white rounded-lg shadow-lg p-8 m-4 max-w-sm mx-auto">
                <h3 className="text-2xl text-gray-800 font-bold mb-6">Set Price Alerts</h3>
                <p className="text-gray-600 mb-4">
                    By submitting the form below, you will receive email updates
                    when the price of {coinData.name} goes above the upper bound
                    or below the lower bound.
                </p>
                <p className="text-gray-600 mb-4">
                    Current Price = ₹{coinData?.market_data?.current_price?.inr}
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="upperBound" className="block text-sm font-medium text-gray-700">Upper Bound:</label>
                        <input
                            type="number"
                            id="upperBound"
                            value={upperBound}
                            onChange={handleUpperBoundChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lowerBound" className="block text-sm font-medium text-gray-700">Lower Bound:</label>
                        <input
                            type="number"
                            id="lowerBound"
                            value={lowerBound}
                            onChange={handleLowerBoundChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="agreeCheckbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label htmlFor="agreeCheckbox" className="ml-2 block text-sm text-gray-900">I agree to receive email updates.</label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none transition-colors duration-200"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PriceAlertPopup;
