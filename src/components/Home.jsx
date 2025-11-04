import { Link } from "react-router"

export default function Home() {
  return (
    <div className="text-black flex flex-col items-center justify-start w-full p-10 gap-10 bg-linear-to-b from-[#e2e6f7] to-[#fdfdfd] h-screen">
      <div className="flex flex-col justify-center items-center gap-2">
        <h1 className="text-5xl font-bold text-center">Welcome to ShopHub</h1>
        <p className="w-96">Discover premium products curated just for you. Shop with confidence and enjoy fast, reliable delivery.</p>
        <Link to="/products" className="text-white font-bold bg-[#FF1F4A] py-3 px-6 rounded-xl">Start Shopping</Link>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <h2 className="text-4xl font-bold">Why Shop With Us</h2>
        <div className="flex gap-4 flex-wrap justify-center lg:">
          <div className="bg-white rounded-lg p-5 border-solid border-[#F5C5C8] border min-w-[200px] md:max-w-[320px] grow flex flex-col items-center">
            <p className="font-bold text-xl mb-1">Free Shipping</p>
            <p>On orders over $50. Fast and reliable delivery to your doorstep.</p>
          </div>
          <div className="bg-white rounded-lg p-5 border-solid border-[#F5C5C8] border min-w-[200px] md:max-w-[320px] grow flex flex-col items-center">
            <p className="font-bold text-xl mb-1">Quality Guaranteed</p>
            <p>All products are carefully selected and tested for quality assurance.</p>
          </div>
          <div className="bg-white rounded-lg p-5 border-solid border-[#F5C5C8] border min-w-[200px] md:max-w-[320px] grow flex flex-col items-center">
            <p className="font-bold text-xl mb-1">Easy Returns</p>
            <p>30-day return policy with no questions asked. Your satisfaction matters.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-4xl font-bold">Featured Products</h2>
        <p>Check out our latest collection of premium items</p>
        <Link to="/products" className="bg-[#3A2C82] rounded-md px-4 py-2 text-white font-bold">View All Products</Link>
      </div>
    </div>
  )
}