 import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What are organic fruit and vegetable powders?",
    answer:
      "Organic fruit and vegetable powders are made by dehydrating fresh, organically grown produce and grinding them into fine powders without any artificial colors or preservatives.",
  },
  {
    question: "Are your powders 100% natural and chemical-free?",
    answer:
      "Yes, all our products at Noor Enterprise are completely organic, chemical-free, and preservative-free. We ensure purity and maintain nutritional value in every pack.",
  },
  {
    question: "How should I store these powders?",
    answer:
      "Store the powders in a cool, dry place away from direct sunlight. Make sure the lid is tightly closed after each use to maintain freshness.",
  },
  {
    question: "Can I mix these powders in smoothies or juices?",
    answer:
      "Absolutely! Our powders dissolve easily and can be added to smoothies, juices, soups, baking mixes, or even skincare recipes for natural nourishment.",
  },
  {
    question: "Do these powders have any added sugar?",
    answer:
      "No, our powders do not contain any added sugar or artificial sweeteners. They retain the natural sweetness and nutrients of the original fruits or vegetables.",
  },
  {
    question: "What is the shelf life of Noor Enterprise powders?",
    answer:
      "Typically, our powders last for 6 to 12 months if stored properly in a sealed container under dry conditions.",
  },
  {
    question: "Do you deliver across India?",
    answer:
      "Yes, we deliver all across India with fast and safe packaging to preserve product quality during transit.",
  },
];

function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-6 md:px-20">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-3">
            <HelpCircle className="text-green-700 w-10 h-10" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 mt-2 text-lg">
            Have questions about our organic powders? Find answers below!
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-green-100 transition-all duration-300"
            >
              {/* Question Row */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="text-gray-800 font-medium text-lg">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-green-600 w-6 h-6" />
                ) : (
                  <ChevronDown className="text-green-600 w-6 h-6" />
                )}
              </button>

              {/* Answer */}
              <div
                className={`px-6 pb-4 text-gray-600 text-base leading-relaxed transition-all duration-300 ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQPage;
