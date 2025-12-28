"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface TourPriceDisplayProps {
  price: number;
  label?: string;
}

export default function TourPriceDisplay({
  price,
  label = "",
}: TourPriceDisplayProps) {
  const { convertToUSD, convertToEUR } = useCurrency();

  return (
    <span className="text-sm text-gray-500">
      ${convertToUSD(price)} / €{convertToEUR(price)}
      {label && ` ${label}`}
    </span>
  );
}
