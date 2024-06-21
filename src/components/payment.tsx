"use client";

import Script from "next/script";

const Payment = ({ amount }: { amount: number }) => {
  const handlePayment = async (e: any) => {
    const res = await fetch("/api/payment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    const amountToPay = parseInt(data.data.amount) * 10000;
    const options = {
      key_id: "rzp_test_hJOfjrq717Ffbt", // Enter the Key ID generated from the Dashboard
      amount: amountToPay + "", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Cafe-Project", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data?.data?.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response: any) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Shlok Sinha", //your customer's name
        email: "sinhashlok@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    // @ts-ignore: Unreachable code error
    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };
  if (amount != 0) {
    return (
      <div className="mt-4 flex flex-col items-end">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <button
          className="p-4 text-xl rounded-lg bg-green-400 hover:bg-green-500 font-bold text-white"
          onClick={(e: any) => handlePayment(e)}
        >
          Confirm Payment
        </button>
        <p className="text-sm">Powered by Razorpay</p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Payment;
