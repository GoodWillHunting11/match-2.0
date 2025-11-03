export default function SuccessPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0d0d0d] text-white p-8">
        <h1 className="text-4xl font-bold mb-4 text-[#f5d3e4]">Payment Successful!</h1>
        <p className="text-lg mb-8 max-w-md text-center">
          Thank you for your purchase — your order is being processed and you’ll receive a confirmation email shortly.
        </p>
        <a
          href="/shop"
          className="px-6 py-3 bg-[#f5d3e4] text-white rounded-[2rem] font-bold hover:scale-[1.03] transition duration-300"
        >
          Back to Shop
        </a>
      </div>
    );
  }
  