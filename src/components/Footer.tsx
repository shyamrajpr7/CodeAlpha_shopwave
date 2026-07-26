import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-display text-xl font-bold text-white">ShopWave</span>
            </div>
            <p className="text-sm leading-relaxed">
              Premium tech peripherals for creators, coders, and power users.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?category=Audio" className="hover:text-white transition-colors">Audio</Link></li>
              <li><Link href="/products?category=Peripherals" className="hover:text-white transition-colors">Peripherals</Link></li>
              <li><Link href="/products?category=Video" className="hover:text-white transition-colors">Video</Link></li>
              <li><Link href="/products?category=Displays" className="hover:text-white transition-colors">Displays</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/auth/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link href="/orders" className="hover:text-white transition-colors">Order History</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>support@shopwave.com</li>
              <li>+1 (555) 123-4567</li>
              <li>San Francisco, CA</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ShopWave. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
