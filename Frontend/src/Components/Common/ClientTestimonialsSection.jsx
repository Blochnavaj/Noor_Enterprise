import React from "react";
import { Star } from "lucide-react";
import assets from "../../assets/assets";

function ClientTestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Organic India",
      image: assets.client1,
      feedback:
        "The quality of the fruit powder is exceptional! It has become an essential ingredient in our daily product line.",
      rating: 5,
    },
    {
      id: 2,
      name: "Wellness World",
      image: assets.client2,
      feedback:
        "We love that it's 100% natural and chemical-free. Our customers can taste the difference!",
      rating: 5,
    },
    {
      id: 3,
      name: "Nature Drinks Co.",
      image: assets.client3,
      feedback:
        "Consistency, aroma, and flavor are top-notch. It’s been a game changer for our brand.",
      rating: 4,
    },
    {
      id: 4,
      name: "PureBlend Foods",
      image: assets.client4,
      feedback:
        "Partnering with Feelize for natural powders helped us elevate our smoothie and health drink line!",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          What Our Clients Say 💬
        </h2>
        <p className="text-gray-600 mb-10">
          Hear from our happy partners who trust our organic powders for their best-selling products.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center border border-green-100 hover:shadow-xl transition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h3 className="font-semibold text-gray-800">{t.name}</h3>
              <div className="flex justify-center mt-2 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-yellow-500 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm">{t.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientTestimonialsSection;
