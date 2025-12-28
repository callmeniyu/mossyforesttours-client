"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface HomeTourPriceDisplayProps {
  price: number;
}

export default function HomeTourPriceDisplay({
  price,
}: HomeTourPriceDisplayProps) {
  const { convertToUSD, convertToEUR } = useCurrency();

  return (
    <div className="flex items-center gap-2 text-sm text-white/80">
      <span>${convertToUSD(price)}</span>
      <span>•</span>
      <span>€{convertToEUR(price)}</span>
    </div>
  );
}
