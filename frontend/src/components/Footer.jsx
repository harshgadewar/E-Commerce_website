export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Velora
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Discover products you’ll love, delivered right to your doorstep.
              Simple shopping. Better choices.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold text-white">Shop</h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/products" className="transition hover:text-white">
                  All Products
                </a>
              </li>
              <li>
                <a href="/categories" className="transition hover:text-white">
                  Categories
                </a>
              </li>
              <li>
                <a href="/cart" className="transition hover:text-white">
                  Cart
                </a>
              </li>
              <li>
                <a href="/orders" className="transition hover:text-white">
                  My Orders
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="/about" className="transition hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="transition hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="transition hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="transition hover:text-white">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white">Need Help?</h3>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Have a question about your order or need help with something?
            </p>

            <a
              href="/contact"
              className="mt-5 inline-block rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-950 transition hover:bg-gray-200"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Velora. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a href="#" className="transition hover:text-white">
                Instagram
              </a>
              <a href="#" className="transition hover:text-white">
                X
              </a>
              <a href="#" className="transition hover:text-white">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}