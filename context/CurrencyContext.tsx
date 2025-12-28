"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface ExchangeRates {
  USD: number;
  EUR: number;
  lastUpdated: string;
}

interface CurrencyContextType {
  rates: ExchangeRates | null;
  loading: boolean;
  error: string | null;
  convertToUSD: (myrAmount: number) => number;
  convertToEUR: (myrAmount: number) => number;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

// Fallback rates in case API fails
const FALLBACK_RATES = {
  USD: 0.224,
  EUR: 0.214,
  lastUpdated: new Date().toISOString(),
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/currency/rates`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
      }

      const data = await response.json();

      if (data.success && data.data) {
        setRates({
          USD: data.data.USD,
          EUR: data.data.EUR,
          lastUpdated: data.data.lastUpdated,
        });
        setError(null);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching exchange rates:", err);
      setError("Failed to load exchange rates, using fallback values");
      // Use fallback rates if API fails
      setRates(FALLBACK_RATES);
    } finally {
      setLoading(false);
    }
  };

  const refreshRates = async () => {
    setLoading(true);
    await fetchRates();
  };

  useEffect(() => {
    fetchRates();

    // Refresh rates every 6 hours
    const interval = setInterval(fetchRates, 6 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const convertToUSD = (myrAmount: number): number => {
    if (!rates) return Math.round(myrAmount * FALLBACK_RATES.USD);
    return Math.round(myrAmount * rates.USD);
  };

  const convertToEUR = (myrAmount: number): number => {
    if (!rates) return Math.round(myrAmount * FALLBACK_RATES.EUR);
    return Math.round(myrAmount * rates.EUR);
  };

  return (
    <CurrencyContext.Provider
      value={{
        rates,
        loading,
        error,
        convertToUSD,
        convertToEUR,
        refreshRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
