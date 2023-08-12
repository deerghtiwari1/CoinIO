import { getUserToken } from "@/utils/getUserToken";
import { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";

const SubscribePopup = ({ coinData, onClose }) => {
    const [isChecked, setIsChecked] = useState(false);
    const userId = getUserToken();
    const popupRef = useRef();

    console.log(userId);

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
    };

    const handleSubscribe = async () => {
        try {
            if (isChecked) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/notify/subscribe/currency`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: userId,
                            currencyId: coinData.id,
                        }),
                    }
                );
                const data = await response.json();
                if (response.status === 200) {
                    console.log("Subscription success:", data);
                    alert(data.message);
                    onClose();
                } else {
                    console.error(`Failed with status code ${response.status}`);
                }
            }
        } catch (error) {
            console.error("Subscription error:", error);
        }
    };

    const handleClickOutside = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={popupRef} className="relative bg-white rounded-lg shadow-lg p-8 m-4 max-w-sm mx-auto">
                <button
                    className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-800"
                    onClick={onClose}
                >
                    <MdClose size={24} />
                </button>
                <h3 className="text-2xl text-gray-800 font-bold mb-6">Subscribe for Daily Updates</h3>
                <p className="text-gray-600 mb-4">By checking the box below and submitting, you will receive email updates on {coinData.name} every 24 hours.</p>
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="mr-2"
                    />
                    <span className="text-gray-600">I agree to receive email updates.</span>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSubscribe}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none transition-colors duration-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscribePopup;
