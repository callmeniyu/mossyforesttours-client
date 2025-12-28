"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type TermItem = {
  title: string;
  content: string[];
  id: string;
};

export default function TermsAndConditions() {
  const termsData: TermItem[] = [
    {
      title: "Confirmation",
      content: [
        "A booking confirmation will be sent automatically to the guest’s registered email after successful payment.",
        "Guests must present their booking confirmation during check-in. Both printed and mobile versions are accepted, but the confirmation must clearly show the guest name, dates, and booking details.",
        "For tours and transport services, guests are required to show proof of booking before boarding or joining. Failure to provide confirmation may result in denial of service.",
        "Guests are responsible for ensuring that their booking information is correct. Any errors must be reported to Cameron Highlands Tours immediately.",
      ],
      id: "confirmation",
    },
    {
      title: "Cancellation Policy",
      content: [
        "All cancellation requests must be submitted in writing through email or the official booking platform used at the time of reservation.",
        "Refund eligibility depends on the type of booking and the cancellation period. Tours canceled 48 hours or more before departure receive a full refund. Cancellations within 48 hours are non-refundable.",
        "No-shows without prior notice will be charged the full booking amount.",
        "Cameron Highlands Tours is not responsible for cancellations caused by weather, transportation delays, or unforeseen circumstances beyond its control.",
        "Travel insurance is strongly recommended to protect against unexpected cancellations.",
      ],
      id: "cancellation",
    },
    {
      title: "Hotel Pick-Up Information",
      content: [
        "Complimentary pick-up service is available for hotels and accommodations located in Tanah Rata, Brinchang, Kea Farm, and nearby areas within Cameron Highlands.",
        "Guests staying outside standard pick-up zones must arrange their own transport to the designated meeting point, or a surcharge may apply.",
        "Guests are expected to be ready at the hotel lobby or pick-up point at least 10 minutes before the scheduled departure time.",
        "Pick-up and drop-off times may vary slightly due to traffic and weather conditions. Cameron Highlands Tours is not liable for delays caused by external factors.",
        "For private tours, custom pick-up arrangements can be made upon request during booking.",
      ],
      id: "pickup",
    },
    {
      title: "Tour Guidelines & Conduct",
      content: [
        "Guests are expected to follow the guide's instructions at all times for safety and group coordination.",
        "Smoking is strictly prohibited inside vehicles and at certain tour locations. Please respect designated smoking areas.",
        "Alcohol consumption is not permitted during tours unless explicitly included as part of the experience.",
        "Guests must respect local customs, wildlife, and natural environments visited during tours.",
        "Disruptive or inappropriate behavior may result in removal from the tour without refund.",
      ],
      id: "limitations",
    },
    {
      title: "Accessibility",
      content: [
        "Cameron Highlands Tours welcomes all guests. However, some tours involve uneven terrain, stairs, or moderate physical activity that may not be suitable for guests with limited mobility.",
        "Wheelchair access may be limited on certain tours due to natural terrain and attraction layouts.",
        "Guests with medical conditions, physical limitations, or special requirements are strongly advised to inform us before booking so appropriate arrangements can be made.",
        "While we make reasonable efforts to accommodate special needs, accessibility cannot be guaranteed for all tours and locations.",
      ],
      id: "accessibility",
    },
    {
      title: "Important Notes",
      content: [
        "Guests must bring valid identification and booking confirmation for verification before joining tours.",
        "Entrance fees to attractions are included in tour prices unless stated otherwise.",
        "It is the guest’s responsibility to bring valid identification and booking confirmation in English for verification at check-in or before joining a tour.",
        "Cameron Highlands Tours is not responsible for loss, theft, or damage to guests’ personal belongings during tours. Guests are encouraged to keep valuables secure.",
        "Travel insurance is strongly recommended to cover medical needs, trip cancellations, and personal belongings.",
        "Weather conditions in Cameron Highlands can be unpredictable. Guests should bring appropriate clothing, including light jackets and rain protection.",
        "By confirming a booking, guests agree to comply with all Cameron Highlands Tours policies and local laws during their stay and activities.",
      ],
      id: "notes",
    },
  ];

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    () => {
      const allExpanded: Record<string, boolean> = {};
      termsData.forEach((term) => {
        allExpanded[term.id] = true;
      });
      return allExpanded;
    }
  );
  const [fromBooking, setFromBooking] = useState(false);

  const [fromTour, setFromTour] = useState(false);

  useEffect(() => {
    const state = window.history.state;
    console.log("Navigated from booking page", state.fromBookingPage);
    if (state?.fromBookingPage) {
      setFromBooking(true);
    }
  }, []);

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    termsData.forEach((term) => {
      allExpanded[term.id] = true;
    });
    setExpandedItems(allExpanded);
  };

  const collapseAll = () => {
    setExpandedItems({});
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins pt-16">
      {/* Hero Section */}
      <div className="bg-primary text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Terms & Conditions
        </h1>
        <p className="text-xl max-w-2xl mx-auto">
          Important information about your booking with Cameron Highlands Tours
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Controls */}
        <div className="mb-8">
          <div className="flex gap-2">
            <button
              onClick={expandAll}
              className="text-sm bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-sm bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Terms List */}
        <div className="space-y-4">
          {termsData.length > 0 ? (
            termsData.map((term) => (
              <div
                key={term.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleItem(term.id)}
                  className={`w-full flex items-center justify-between p-5 text-left ${
                    expandedItems[term.id] ? "bg-primary/5" : ""
                  }`}
                >
                  <h3 className="font-semibold text-lg text-title_black">
                    {term.title}
                  </h3>
                  {expandedItems[term.id] ? (
                    <FiChevronUp className="text-primary" />
                  ) : (
                    <FiChevronDown className="text-primary" />
                  )}
                </button>
                <div
                  className={`px-5 pb-5 transition-all duration-300 ease-in-out ${
                    expandedItems[term.id] ? "block" : "hidden"
                  }`}
                >
                  <div className="prose text-desc_gray">
                    <ul className="list-disc pl-5 space-y-2">
                      {term.content.map((line, i) => (
                        <li key={i} className="text-sm">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-title_black mb-2">
                No terms found
              </h3>
              <p className="text-desc_gray">Try a different search term</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
