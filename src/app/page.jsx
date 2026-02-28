"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getProducts } from "../lib/data";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryParam = searchParams.get("category") || "all";
  const sortParam = searchParams.get("sort") || "newest";
  const searchParam = searchParams.get("search") || "";
  const pageParam = parseInt(searchParams.get("page") || "1", 10);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProducts({
        category: categoryParam,
        sort: sortParam,
        search: searchParam,
        page: pageParam,
        limit: 6
      });
      setProducts(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  }, [categoryParam, sortParam, searchParam, pageParam]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateFilters = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    if (key !== "page") {
      params.set("page", "1"); // reset to page 1 on filter change
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 lg:py-22 w-full">

      <div className="mb-12 md:mb-24 text-center max-w-2xl mx-auto px-4 md:px-0">
        <h1 className="font-outfit text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tighter text-[#111] mb-6 leading-[1.1]">
          Everything you need, in one place.
        </h1>
        <p className="text-base md:text-xl text-zinc-500 leading-relaxed max-w-xl mx-auto">
          Explore our diverse catalog of premium electronics, comfortable clothing, and modern homeware.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-20">
        <FilterSidebar
          currentCategory={categoryParam}
          onCategoryChange={(val) => updateFilters("category", val)}
          currentSort={sortParam}
          onSortChange={(val) => updateFilters("sort", val)}
        />

        <div className="flex-1 w-full overflow-hidden">
          {/* Mobile Sort */}
          <div className="flex justify-between items-center mb-6 md:hidden px-2">
            <span className="text-sm text-zinc-500 font-medium">{total} results</span>
            <div className="relative">
              <select
                value={sortParam}
                onChange={(e) => updateFilters("sort", e.target.value)}
                className="appearance-none bg-zinc-100 text-black text-sm font-medium focus:outline-none cursor-pointer px-4 py-2 rounded-lg border border-transparent focus:border-black/10 pr-8"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="animate-spin text-zinc-300 w-8 h-8" />
            </div>
          ) : products.length > 0 
            ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-12">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-2xl border border-dashed border-zinc-200">
              <h3 className="font-outfit text-xl font-medium text-black mb-2">No products found</h3>
              <p className="text-zinc-500">We couldn't find anything matching your current filters.</p>
              <button
                onClick={() => router.push("/")}
                className="mt-6 text-sm font-medium underline underline-offset-4 pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {!loading && total > 6 && (
            <div className="mt-16 flex justify-center gap-2">
              <button
                disabled={pageParam === 1}
                onClick={() => updateFilters("page", String(pageParam - 1))}
                className="px-5 py-2.5 rounded-full border border-zinc-200 text-sm font-medium disabled:opacity-50 hover:bg-zinc-50 transition-colors"
              >
                Previous
              </button>
              <button
                disabled={pageParam * 6 >= total}
                onClick={() => updateFilters("page", String(pageParam + 1))}
                className="px-5 py-2.5 rounded-full border border-zinc-200 text-sm font-medium disabled:opacity-50 hover:bg-zinc-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-zinc-300 w-8 h-8" /></div>}>
      <HomeContent />
    </Suspense>
  );
}
