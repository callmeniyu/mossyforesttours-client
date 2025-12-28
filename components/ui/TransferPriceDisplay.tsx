"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface TransferPriceDisplayProps {
  price: number;
}

export default function TransferPriceDisplay({
  price,
}: TransferPriceDisplayProps) {
  const { convertToUSD, convertToEUR } = useCurrency();

  return (
    <div className="text-sm text-gray-600 mt-1">
      ${convertToUSD(price)} / €{convertToEUR(price)}
    </div>
  );
}
