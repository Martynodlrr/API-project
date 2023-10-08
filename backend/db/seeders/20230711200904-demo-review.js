'use strict';

let options = {};
options.tableName = 'Reviews'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};
    const data = [
      {
        spotId: 3,
        userId: 2,
        review: "Great location, just minutes away from downtown. The house had a cozy ambiance, and the host was very communicative. The kitchen was fully equipped, making our stay comfortable. Highly recommended.",
        stars: 4,
      },
      {
        spotId: 4,
        userId: 3,
        review: "What a gem! This Airbnb had a stunning view of the ocean. The interior was modern and had all the amenities we needed. The host gave us local tips that were very useful. A bit pricey, but worth every penny.",
        stars: 3,
      },
      {
        spotId: 5,
        userId: 4,
        review: "I was pleasantly surprised by this place. Spacious rooms, comfortable beds, and a beautiful garden. The neighborhood was quiet, perfect for a peaceful retreat. The host left a guidebook with restaurant recommendations that we loved. Top-notch experience.",
        stars: 3,
      },
      {
        spotId: 6,
        userId: 5,
        review: "This house was a dream come true for our family vacation. Kids loved the pool, and the adults enjoyed the BBQ area. It's close to shops and restaurants, but still feels secluded. The host was friendly and always available for questions. We had a minor issue with the WiFi, but it was resolved quickly. Will be back!",
        stars: 1,
      },
      {
        spotId: 3,
        userId: 1,
        review: "Had an absolutely wonderful time at this Airbnb. The house boasts a blend of rustic charm and modern amenities. We especially loved the fireplace on chilly evenings. Located in a historic district, there's plenty to explore nearby. The host was very considerate, leaving us a bottle of wine and some local snacks. Only drawback: limited parking. Plan accordingly.",
        stars: 3,
      },
      {
        spotId: 4,
        userId: 2,
        review: "This Airbnb was everything we hoped for and more. Nestled in the heart of the city, it was an oasis. The decor was chic and tasteful, making us feel like we were in a luxury suite. The balcony was a favorite spot, overlooking bustling streets. The host was super helpful, recommending hidden gems in the city. We had a slight hiccup with the heating system, but the host had it fixed in no time. The only thing we missed was a microwave, but that's just nitpicking. Overall, a fabulous stay.",
        stars: 3,
      },
      {
        spotId: 5,
        userId: 3,
        review: "I'm still in awe of this house's beauty. From the stunning architecture to the well-maintained gardens, everything was impeccable. The rooms were spacious, and the beds were the definition of comfort. The location was prime, a short walk to the beach and local eateries. The host was very attentive and made sure we had a smooth check-in and check-out process. She even arranged a surprise birthday cake for my partner, making our trip even more special. The only minor complaint would be the weak water pressure in the upstairs bathroom. But that didn’t hinder our overall experience. We're already planning our next trip back.",
        stars: 2,
      },
      {
        spotId: 7,
        userId: 4,
        review: "If I could give this Airbnb more than five stars, I would. The house was situated in a picturesque neighborhood, surrounded by trees and nature. The interiors were thoughtfully designed, with artworks and souvenirs from around the world. The kitchen was a chef's dream, stocked with every gadget imaginable. The master bedroom had a skylight, allowing us to stargaze from our bed. The host went above and beyond, providing us with a comprehensive guidebook of the area, and even arranging a wine tour for us. We were a group of eight, and the house accommodated us comfortably without feeling crowded. Our only regret was not booking it for longer. We've stayed in many Airbnbs, but this one tops the list.",
        stars: 4,
      },
      {
        spotId: 8,
        userId: 1,
        review: "This Airbnb truly felt like home away from home. Every corner of the house was immaculately clean and oozed comfort. The living room had a vast collection of books and board games, ensuring we never had a dull moment. The kitchen was equipped with top-notch appliances, and we enjoyed cooking meals together. The backyard was a sanctuary, with a hammock and firepit. It was perfect for evening relaxation. The neighborhood was safe and quiet, with a park nearby for morning jogs. The host was phenomenal, checking in on us regularly and offering local insights. She even left a basket of fresh fruits and pastries for us upon arrival. The only thing we would suggest is adding a few more channels to the TV subscription. But honestly, with so much to do, we barely missed it.",
        stars: 5,
      },
      {
        spotId: 9,
        userId: 2,
        review: "Booking this Airbnb was the best decision we made for our vacation. The pictures don't do justice to its beauty. The house was a mix of vintage charm and modern conveniences. Each room had its unique character, adorned with antiques and plush furnishings. The highlight was the sunroom, filled with plants and sunlight. It was our favorite spot for morning coffees. The location was unbeatable, with cafes, boutiques, and museums within walking distance. We also appreciated the eco-friendly initiatives by the host, like providing reusable shopping bags and compost bins. The host's hospitality was commendable. From giving us a personal tour of the house to leaving a hand-written note with restaurant suggestions, she made us feel welcomed. The only feedback we'd offer is to improve the WiFi connectivity in certain rooms. But it's a minor thing in an otherwise flawless experience. Highly recommended.",
        stars: 5,
      },
      {
        spotId: 10,
        userId: 3,
        review: "Staying at this Airbnb was like stepping into a fairytale. Set atop a hill, the views were breathtaking. The house itself was a work of art, with intricate woodwork and stained glass windows. Every room told a story, filled with memorabilia and vintage furniture. The library was a treasure trove, boasting a collection of classics and rare editions. We spent hours there, lost in books. The kitchen was modern and had everything we needed. We loved the outdoor area, complete with a jacuzzi and gazebo. It was perfect for evening gatherings. The location was convenient, close to the town center, yet away from the hustle and bustle. The host was a delight, sharing tales of the house's history and ensuring we had a comfortable stay. Our only gripe was the lack of air conditioning in some rooms. But with the cool breeze and fans provided, it wasn't much of an issue. This house is a hidden gem, and we're grateful to have found it.",
        stars: 2,
      },
      {
        spotId: 11,
        userId: 4,
        review: "We were a bit skeptical about booking this Airbnb, given it was a new listing with limited reviews. But we took the plunge, and it was the best decision ever. The house is a masterpiece. Modern design seamlessly blended with traditional elements. The living room had floor-to-ceiling windows, offering panoramic views of the city. The bedrooms were spacious, each with its private balcony. The amenities were top-notch, from the heated floors to the surround sound system. The backyard was an oasis, featuring a koi pond and a meditation corner. We also had access to bicycles, which we used to explore the neighborhood. The host was exceptional, greeting us personally and giving us a tour. She had stocked the fridge with essentials and even left a bottle of champagne for us. Throughout our stay, she was just a message away, ready to assist. Our only suggestion would be to add some blackout curtains in the bedrooms for those who like to sleep in. But that's just a personal preference. We've already recommended this place to all our friends and can't wait to return.",
        stars: 2,
      },
      {
        spotId: 12,
        userId: 1,
        review: "This Airbnb was a delightful surprise. Situated in the heart of the countryside, it offered the perfect escape from our hectic city lives. The house was a blend of traditional architecture and modern amenities. The wooden beams and stone walls added a rustic charm, while the smart home features ensured convenience. The kitchen was a dream, with a vast island and top-of-the-line appliances. We enjoyed cooking meals and dining al fresco in the garden. The bedrooms were cozy, with soft linens and memory foam mattresses. The entertainment room was a hit, complete with a projector and a vast collection of movies. The host had thought of everything, from providing board games to setting up a bonfire pit. She was attentive and always available for recommendations. We also appreciated the eco-friendly touches, like the solar panels and rainwater harvesting system. The location was serene, surrounded by rolling hills and vineyards. We took daily walks, breathing in the fresh air and admiring nature. Our only feedback would be to improve the WiFi speed, as we had a few interruptions during video calls. But it was a minor inconvenience in an otherwise perfect stay. We're already planning our next visit.",
        stars: 3,
      },
      {
        spotId: 13,
        userId: 2,
        review: "This Airbnb exceeded all our expectations. Nestled in a quaint village, it offered the perfect blend of history and luxury. The house was centuries old, with exposed brick walls and wooden rafters, adding a touch of nostalgia. Yet, it was fitted with all modern conveniences. The living room was vast, adorned with vintage furniture and a grand piano. We spent evenings there, listening to music and sipping wine. The kitchen was state-of-the-art, and the host had generously stocked it with gourmet ingredients. The bedrooms were plush, each offering scenic views of the countryside. The bathrooms were equipped with jacuzzis and rain showers, adding a touch of opulence. The garden was the highlight, with blooming flowers, fruit trees, and a natural pond. We enjoyed picnics there, basking in the sun. The location was ideal, a stone's throw away from local cafes and artisan shops. The host was remarkable, sharing tales of the house's legacy and offering guided tours of the village. She had curated a list of activities for us, from pottery workshops to wine tastings. Our only suggestion would be to add some more lighting in the hallways, as they were a bit dim at night. But it's a minor detail in an otherwise perfect experience. We left with our hearts full and memories that will last a lifetime.",
        stars: 4,
      },
      {
        spotId: 14,
        userId: 3,
        review: "Booking this Airbnb was a leap of faith, and we're so glad we took it. Situated on a private island, it was the epitome of luxury and privacy. The house was a modern marvel, with glass walls offering 360-degree views of the ocean. Every room was designed with precision, boasting minimalistic decor and high-end fixtures. The living area was vast, with a fireplace and a state-of-the-art entertainment system. We enjoyed movie nights there, with the sound of waves in the background. The kitchen was a culinary paradise, fitted with the latest appliances and a wine cellar. The bedrooms were sanctuaries, with automated curtains and temperature control. The bathrooms were like personal spas, with heated floors and steam showers. The outdoor area was equally impressive, featuring an infinity pool, hot tub, and a private dock. We indulged in water sports and sunbathing, without a care in the world. The host was exceptional, arranging for a private chef and masseuse upon request. She was also knowledgeable about the marine life and organized snorkeling trips for us. Our only feedback would be to provide some bug repellent, as we had a few mosquito encounters. But it's a small price to pay for paradise. This Airbnb is not just a stay, it's an experience, and we're grateful for the memories.",
        stars: 3,
      },
      {
        spotId: 15,
        userId: 4,
        review: "From the moment we stepped into this Airbnb, we knew we were in for a treat. Perched on a cliff, it offered unparalleled views of the mountains and valley below. The house itself was an architectural masterpiece, a perfect amalgamation of contemporary design and natural elements. The vast living area had a vaulted ceiling, with skylights flooding the space with natural light. The decor was tasteful, with handcrafted furniture and original artworks adorning the walls. The kitchen was a chef's haven, with a commercial-grade stove and a walk-in pantry. We enjoyed cooking meals, using fresh produce from the host's organic farm. The bedrooms were havens of tranquility, with floor-to-ceiling windows and plush bedding. We woke up to the sound of birds and the sight of mist-covered mountains. The bathrooms were luxurious, with marble fittings and rain showers. The outdoor area was equally impressive, featuring a heated pool, cabanas, and a barbecue station. We spent our days hiking, exploring the nearby waterfalls, and evenings by the fire pit, stargazing. The host was incredible, offering insights into the local culture and arranging adventure trips for us. She also organized a traditional cooking class, where we learned to make local delicacies. Our only gripe was the intermittent power outages, but the house had a backup generator, so it was never an issue. This Airbnb is more than just a place to stay; it's a destination in itself. We left with our souls rejuvenated and a promise to return.",
        stars: 5,
      },
      {
        spotId: 16,
        userId: 5,
        review: "Loved the house! Centrally located, beautifully furnished, and extremely clean. The host was accommodating. Will definitely return on my next visit.",
        stars: 2,
      },
      {
        spotId: 17,
        userId: 1,
        review: "Great location, just minutes away from downtown. The house had a cozy ambiance, and the host was very communicative. The kitchen was fully equipped, making our stay comfortable. Highly recommended.",
        stars: 5,
      },
      {
        spotId: 18,
        userId: 2,
        review: "What a gem! This Airbnb had a stunning view of the ocean. The interior was modern and had all the amenities we needed. The host gave us local tips that were very useful. A bit pricey, but worth every penny.",
        stars: 2,
      },
      {
        spotId: 19,
        userId: 3,
        review: "I was pleasantly surprised by this place. Spacious rooms, comfortable beds, and a beautiful garden. The neighborhood was quiet, perfect for a peaceful retreat. The host left a guidebook with restaurant recommendations that we loved. Top-notch experience.",
        stars: 4,
      },
      {
        spotId: 20,
        userId: 4,
        review: "This house was a dream come true for our family vacation. Kids loved the pool, and the adults enjoyed the BBQ area. It's close to shops and restaurants, but still feels secluded. The host was friendly and always available for questions. We had a minor issue with the WiFi, but it was resolved quickly. Will be back!",
        stars: 3,
      },
      {
        spotId: 21,
        userId: 5,
        review: "Had an absolutely wonderful time at this Airbnb. The house boasts a blend of rustic charm and modern amenities. We especially loved the fireplace on chilly evenings. Located in a historic district, there's plenty to explore nearby. The host was very considerate, leaving us a bottle of wine and some local snacks. Only drawback: limited parking. Plan accordingly.",
        stars: 4,
      },
      {
        spotId: 22,
        userId: 1,
        review: "This Airbnb was everything we hoped for and more. Nestled in the heart of the city, it was an oasis. The decor was chic and tasteful, making us feel like we were in a luxury suite. The balcony was a favorite spot, overlooking bustling streets. The host was super helpful, recommending hidden gems in the city. We had a slight hiccup with the heating system, but the host had it fixed in no time. The only thing we missed was a microwave, but that's just nitpicking. Overall, a fabulous stay.",
        stars: 5,
      },
      {
        spotId: 23,
        userId: 2,
        review: "I'm still in awe of this house's beauty. From the stunning architecture to the well-maintained gardens, everything was impeccable. The rooms were spacious, and the beds were the definition of comfort. The location was prime, a short walk to the beach and local eateries. The host was very attentive and made sure we had a smooth check-in and check-out process. She even arranged a surprise birthday cake for my partner, making our trip even more special. The only minor complaint would be the weak water pressure in the upstairs bathroom. But that didn’t hinder our overall experience. We're already planning our next trip back.",
        stars: 4,
      },
      {
        spotId: 24,
        userId: 3,
        review: "If I could give this Airbnb more than five stars, I would. The house was situated in a picturesque neighborhood, surrounded by trees and nature. The interiors were thoughtfully designed, with artworks and souvenirs from around the world. The kitchen was a chef's dream, stocked with every gadget imaginable. The master bedroom had a skylight, allowing us to stargaze from our bed. The host went above and beyond, providing us with a comprehensive guidebook of the area, and even arranging a wine tour for us. We were a group of eight, and the house accommodated us comfortably without feeling crowded. Our only regret was not booking it for longer. We've stayed in many Airbnbs, but this one tops the list.",
        stars: 2,
      },
      {
        spotId: 25,
        userId: 4,
        review: "This Airbnb truly felt like home away from home. Every corner of the house was immaculately clean and oozed comfort. The living room had a vast collection of books and board games, ensuring we never had a dull moment. The kitchen was equipped with top-notch appliances, and we enjoyed cooking meals together. The backyard was a sanctuary, with a hammock and firepit. It was perfect for evening relaxation. The neighborhood was safe and quiet, with a park nearby for morning jogs. The host was phenomenal, checking in on us regularly and offering local insights. She even left a basket of fresh fruits and pastries for us upon arrival. The only thing we would suggest is adding a few more channels to the TV subscription. But honestly, with so much to do, we barely missed it.",
        stars: 4,
      },
      {
        spotId: 26,
        userId: 5,
        review: "Booking this Airbnb was the best decision we made for our vacation. The pictures don't do justice to its beauty. The house was a mix of vintage charm and modern conveniences. Each room had its unique character, adorned with antiques and plush furnishings. The highlight was the sunroom, filled with plants and sunlight. It was our favorite spot for morning coffees. The location was unbeatable, with cafes, boutiques, and museums within walking distance. We also appreciated the eco-friendly initiatives by the host, like providing reusable shopping bags and compost bins. The host's hospitality was commendable. From giving us a personal tour of the house to leaving a hand-written note with restaurant suggestions, she made us feel welcomed. The only feedback we'd offer is to improve the WiFi connectivity in certain rooms. But it's a minor thing in an otherwise flawless experience. Highly recommended.",
        stars: 3,
      },
      {
        spotId: 27,
        userId: 1,
        review: "Staying at this Airbnb was like stepping into a fairytale. Set atop a hill, the views were breathtaking. The house itself was a work of art, with intricate woodwork and stained glass windows. Every room told a story, filled with memorabilia and vintage furniture. The library was a treasure trove, boasting a collection of classics and rare editions. We spent hours there, lost in books. The kitchen was modern and had everything we needed. We loved the outdoor area, complete with a jacuzzi and gazebo. It was perfect for evening gatherings. The location was convenient, close to the town center, yet away from the hustle and bustle. The host was a delight, sharing tales of the house's history and ensuring we had a comfortable stay. Our only gripe was the lack of air conditioning in some rooms. But with the cool breeze and fans provided, it wasn't much of an issue. This house is a hidden gem, and we're grateful to have found it.",
        stars: 4,
      },
      {
        spotId: 28,
        userId: 2,
        review: "We were a bit skeptical about booking this Airbnb, given it was a new listing with limited reviews. But we took the plunge, and it was the best decision ever. The house is a masterpiece. Modern design seamlessly blended with traditional elements. The living room had floor-to-ceiling windows, offering panoramic views of the city. The bedrooms were spacious, each with its private balcony. The amenities were top-notch, from the heated floors to the surround sound system. The backyard was an oasis, featuring a koi pond and a meditation corner. We also had access to bicycles, which we used to explore the neighborhood. The host was exceptional, greeting us personally and giving us a tour. She had stocked the fridge with essentials and even left a bottle of champagne for us. Throughout our stay, she was just a message away, ready to assist. Our only suggestion would be to add some blackout curtains in the bedrooms for those who like to sleep in. But that's just a personal preference. We've already recommended this place to all our friends and can't wait to return.",
        stars: 3,
      },
      {
        spotId: 29,
        userId: 3,
        review: "This Airbnb was a delightful surprise. Situated in the heart of the countryside, it offered the perfect escape from our hectic city lives. The house was a blend of traditional architecture and modern amenities. The wooden beams and stone walls added a rustic charm, while the smart home features ensured convenience. The kitchen was a dream, with a vast island and top-of-the-line appliances. We enjoyed cooking meals and dining al fresco in the garden. The bedrooms were cozy, with soft linens and memory foam mattresses. The entertainment room was a hit, complete with a projector and a vast collection of movies. The host had thought of everything, from providing board games to setting up a bonfire pit. She was attentive and always available for recommendations. We also appreciated the eco-friendly touches, like the solar panels and rainwater harvesting system. The location was serene, surrounded by rolling hills and vineyards. We took daily walks, breathing in the fresh air and admiring nature. Our only feedback would be to improve the WiFi speed, as we had a few interruptions during video calls. But it was a minor inconvenience in an otherwise perfect stay. We're already planning our next visit.",
        stars: 5,
      },
      {
        spotId: 30,
        userId: 4,
        review: "This Airbnb exceeded all our expectations. Nestled in a quaint village, it offered the perfect blend of history and luxury. The house was centuries old, with exposed brick walls and wooden rafters, adding a touch of nostalgia. Yet, it was fitted with all modern conveniences. The living room was vast, adorned with vintage furniture and a grand piano. We spent evenings there, listening to music and sipping wine. The kitchen was state-of-the-art, and the host had generously stocked it with gourmet ingredients. The bedrooms were plush, each offering scenic views of the countryside. The bathrooms were equipped with jacuzzis and rain showers, adding a touch of opulence. The garden was the highlight, with blooming flowers, fruit trees, and a natural pond. We enjoyed picnics there, basking in the sun. The location was ideal, a stone's throw away from local cafes and artisan shops. The host was remarkable, sharing tales of the house's legacy and offering guided tours of the village. She had curated a list of activities for us, from pottery workshops to wine tastings. Our only suggestion would be to add some more lighting in the hallways, as they were a bit dim at night. But it's a minor detail in an otherwise perfect experience. We left with our hearts full and memories that will last a lifetime.",
        stars: 3,
      },
      {
        spotId: 31,
        userId: 5,
        review: "Booking this Airbnb was a leap of faith, and we're so glad we took it. Situated on a private island, it was the epitome of luxury and privacy. The house was a modern marvel, with glass walls offering 360-degree views of the ocean. Every room was designed with precision, boasting minimalistic decor and high-end fixtures. The living area was vast, with a fireplace and a state-of-the-art entertainment system. We enjoyed movie nights there, with the sound of waves in the background. The kitchen was a culinary paradise, fitted with the latest appliances and a wine cellar. The bedrooms were sanctuaries, with automated curtains and temperature control. The bathrooms were like personal spas, with heated floors and steam showers. The outdoor area was equally impressive, featuring an infinity pool, hot tub, and a private dock. We indulged in water sports and sunbathing, without a care in the world. The host was exceptional, arranging for a private chef and masseuse upon request. She was also knowledgeable about the marine life and organized snorkeling trips for us. Our only feedback would be to provide some bug repellent, as we had a few mosquito encounters. But it's a small price to pay for paradise. This Airbnb is not just a stay, it's an experience, and we're grateful for the memories.",
        stars: 4,
      },
      {
        spotId: 32,
        userId: 1,
        review: "From the moment we stepped into this Airbnb, we knew we were in for a treat. Perched on a cliff, it offered unparalleled views of the mountains and valley below. The house itself was an architectural masterpiece, a perfect amalgamation of contemporary design and natural elements. The vast living area had a vaulted ceiling, with skylights flooding the space with natural light. The decor was tasteful, with handcrafted furniture and original artworks adorning the walls. The kitchen was a chef's haven, with a commercial-grade stove and a walk-in pantry. We enjoyed cooking meals, using fresh produce from the host's organic farm. The bedrooms were havens of tranquility, with floor-to-ceiling windows and plush bedding. We woke up to the sound of birds and the sight of mist-covered mountains. The bathrooms were luxurious, with marble fittings and rain showers. The outdoor area was equally impressive, featuring a heated pool, cabanas, and a barbecue station. We spent our days hiking, exploring the nearby waterfalls, and evenings by the fire pit, stargazing. The host was incredible, offering insights into the local culture and arranging adventure trips for us. She also organized a traditional cooking class, where we learned to make local delicacies. Our only gripe was the intermittent power outages, but the house had a backup generator, so it was never an issue. This Airbnb is more than just a place to stay; it's a destination in itself. We left with our souls rejuvenated and a promise to return.",
        stars: 2,
      },
      {
        spotId: 33,
        userId: 2,
        review: "Loved the house! Centrally located, beautifully furnished, and extremely clean. The host was accommodating. Will definitely return on my next visit.",
        stars: 5,
      },
      {
        spotId: 34,
        userId: 3,
        review: "Great location, just minutes away from downtown. The house had a cozy ambiance, and the host was very communicative. The kitchen was fully equipped, making our stay comfortable. Highly recommended.",
        stars: 3,
      },
      {
        spotId: 35,
        userId: 4,
        review: "What a gem! This Airbnb had a stunning view of the ocean. The interior was modern and had all the amenities we needed. The host gave us local tips that were very useful. A bit pricey, but worth every penny.",
        stars: 5,
      },
      {
        spotId: 36,
        userId: 5,
        review: "I was pleasantly surprised by this place. Spacious rooms, comfortable beds, and a beautiful garden. The neighborhood was quiet, perfect for a peaceful retreat. The host left a guidebook with restaurant recommendations that we loved. Top-notch experience.",
        stars: 3,
      },
      {
        spotId: 37,
        userId: 1,
        review: "This house was a dream come true for our family vacation. Kids loved the pool, and the adults enjoyed the BBQ area. It's close to shops and restaurants, but still feels secluded. The host was friendly and always available for questions. We had a minor issue with the WiFi, but it was resolved quickly. Will be back!",
        stars: 4,
      },
      {
        spotId: 38,
        userId: 2,
        review: "Had an absolutely wonderful time at this Airbnb. The house boasts a blend of rustic charm and modern amenities. We especially loved the fireplace on chilly evenings. Located in a historic district, there's plenty to explore nearby. The host was very considerate, leaving us a bottle of wine and some local snacks. Only drawback: limited parking. Plan accordingly.",
        stars: 5,
      },
      {
        spotId: 39,
        userId: 3,
        review: "This Airbnb was everything we hoped for and more. Nestled in the heart of the city, it was an oasis. The decor was chic and tasteful, making us feel like we were in a luxury suite. The balcony was a favorite spot, overlooking bustling streets. The host was super helpful, recommending hidden gems in the city. We had a slight hiccup with the heating system, but the host had it fixed in no time. The only thing we missed was a microwave, but that's just nitpicking. Overall, a fabulous stay.",
        stars: 2,
      },
      {
        spotId: 40,
        userId: 4,
        review: "I'm still in awe of this house's beauty. From the stunning architecture to the well-maintained gardens, everything was impeccable. The rooms were spacious, and the beds were the definition of comfort. The location was prime, a short walk to the beach and local eateries. The host was very attentive and made sure we had a smooth check-in and check-out process. She even arranged a surprise birthday cake for my partner, making our trip even more special. The only minor complaint would be the weak water pressure in the upstairs bathroom. But that didn’t hinder our overall experience. We're already planning our next trip back.",
        stars: 4,
      },
      {
        spotId: 41,
        userId: 5,
        review: "If I could give this Airbnb more than five stars, I would. The house was situated in a picturesque neighborhood, surrounded by trees and nature. The interiors were thoughtfully designed, with artworks and souvenirs from around the world. The kitchen was a chef's dream, stocked with every gadget imaginable. The master bedroom had a skylight, allowing us to stargaze from our bed. The host went above and beyond, providing us with a comprehensive guidebook of the area, and even arranging a wine tour for us. We were a group of eight, and the house accommodated us comfortably without feeling crowded. Our only regret was not booking it for longer. We've stayed in many Airbnbs, but this one tops the list.",
        stars: 3,
      },
      {
        spotId: 42,
        userId: 1,
        review: "This Airbnb truly felt like home away from home. Every corner of the house was immaculately clean and oozed comfort. The living room had a vast collection of books and board games, ensuring we never had a dull moment. The kitchen was equipped with top-notch appliances, and we enjoyed cooking meals together. The backyard was a sanctuary, with a hammock and firepit. It was perfect for evening relaxation. The neighborhood was safe and quiet, with a park nearby for morning jogs. The host was phenomenal, checking in on us regularly and offering local insights. She even left a basket of fresh fruits and pastries for us upon arrival. The only thing we would suggest is adding a few more channels to the TV subscription. But honestly, with so much to do, we barely missed it.",
        stars: 4,
      },
      {
        spotId: 43,
        userId: 2,
        review: "Booking this Airbnb was the best decision we made for our vacation. The pictures don't do justice to its beauty. The house was a mix of vintage charm and modern conveniences. Each room had its unique character, adorned with antiques and plush furnishings. The highlight was the sunroom, filled with plants and sunlight. It was our favorite spot for morning coffees. The location was unbeatable, with cafes, boutiques, and museums within walking distance. We also appreciated the eco-friendly initiatives by the host, like providing reusable shopping bags and compost bins. The host's hospitality was commendable. From giving us a personal tour of the house to leaving a hand-written note with restaurant suggestions, she made us feel welcomed. The only feedback we'd offer is to improve the WiFi connectivity in certain rooms. But it's a minor thing in an otherwise flawless experience. Highly recommended.",
        stars: 5,
      },
      {
        spotId: 44,
        userId: 3,
        review: "Staying at this Airbnb was like stepping into a fairytale. Set atop a hill, the views were breathtaking. The house itself was a work of art, with intricate woodwork and stained glass windows. Every room told a story, filled with memorabilia and vintage furniture. The library was a treasure trove, boasting a collection of classics and rare editions. We spent hours there, lost in books. The kitchen was modern and had everything we needed. We loved the outdoor area, complete with a jacuzzi and gazebo. It was perfect for evening gatherings. The location was convenient, close to the town center, yet away from the hustle and bustle. The host was a delight, sharing tales of the house's history and ensuring we had a comfortable stay. Our only gripe was the lack of air conditioning in some rooms. But with the cool breeze and fans provided, it wasn't much of an issue. This house is a hidden gem, and we're grateful to have found it.",
        stars: 3,
      },
      {
        spotId: 45,
        userId: 4,
        review: "We were a bit skeptical about booking this Airbnb, given it was a new listing with limited reviews. But we took the plunge, and it was the best decision ever. The house is a masterpiece. Modern design seamlessly blended with traditional elements. The living room had floor-to-ceiling windows, offering panoramic views of the city. The bedrooms were spacious, each with its private balcony. The amenities were top-notch, from the heated floors to the surround sound system. The backyard was an oasis, featuring a koi pond and a meditation corner. We also had access to bicycles, which we used to explore the neighborhood. The host was exceptional, greeting us personally and giving us a tour. She had stocked the fridge with essentials and even left a bottle of champagne for us. Throughout our stay, she was just a message away, ready to assist. Our only suggestion would be to add some blackout curtains in the bedrooms for those who like to sleep in. But that's just a personal preference. We've already recommended this place to all our friends and can't wait to return.",
        stars: 5,
      },
      {
        spotId: 46,
        userId: 5,
        review: "This Airbnb was a delightful surprise. Situated in the heart of the countryside, it offered the perfect escape from our hectic city lives. The house was a blend of traditional architecture and modern amenities. The wooden beams and stone walls added a rustic charm, while the smart home features ensured convenience. The kitchen was a dream, with a vast island and top-of-the-line appliances. We enjoyed cooking meals and dining al fresco in the garden. The bedrooms were cozy, with soft linens and memory foam mattresses. The entertainment room was a hit, complete with a projector and a vast collection of movies. The host had thought of everything, from providing board games to setting up a bonfire pit. She was attentive and always available for recommendations. We also appreciated the eco-friendly touches, like the solar panels and rainwater harvesting system. The location was serene, surrounded by rolling hills and vineyards. We took daily walks, breathing in the fresh air and admiring nature. Our only feedback would be to improve the WiFi speed, as we had a few interruptions during video calls. But it was a minor inconvenience in an otherwise perfect stay. We're already planning our next visit.",
        stars: 3,
      },
      {
        spotId: 47,
        userId: 1,
        review: "This Airbnb exceeded all our expectations. Nestled in a quaint village, it offered the perfect blend of history and luxury. The house was centuries old, with exposed brick walls and wooden rafters, adding a touch of nostalgia. Yet, it was fitted with all modern conveniences. The living room was vast, adorned with vintage furniture and a grand piano. We spent evenings there, listening to music and sipping wine. The kitchen was state-of-the-art, and the host had generously stocked it with gourmet ingredients. The bedrooms were plush, each offering scenic views of the countryside. The bathrooms were equipped with jacuzzis and rain showers, adding a touch of opulence. The garden was the highlight, with blooming flowers, fruit trees, and a natural pond. We enjoyed picnics there, basking in the sun. The location was ideal, a stone's throw away from local cafes and artisan shops. The host was remarkable, sharing tales of the house's legacy and offering guided tours of the village. She had curated a list of activities for us, from pottery workshops to wine tastings. Our only suggestion would be to add some more lighting in the hallways, as they were a bit dim at night. But it's a minor detail in an otherwise perfect experience. We left with our hearts full and memories that will last a lifetime.",
        stars: 5,
      },
      {
        spotId: 48,
        userId: 2,
        review: "Booking this Airbnb was a leap of faith, and we're so glad we took it. Situated on a private island, it was the epitome of luxury and privacy. The house was a modern marvel, with glass walls offering 360-degree views of the ocean. Every room was designed with precision, boasting minimalistic decor and high-end fixtures. The living area was vast, with a fireplace and a state-of-the-art entertainment system. We enjoyed movie nights there, with the sound of waves in the background. The kitchen was a culinary paradise, fitted with the latest appliances and a wine cellar. The bedrooms were sanctuaries, with automated curtains and temperature control. The bathrooms were like personal spas, with heated floors and steam showers. The outdoor area was equally impressive, featuring an infinity pool, hot tub, and a private dock. We indulged in water sports and sunbathing, without a care in the world. The host was exceptional, arranging for a private chef and masseuse upon request. She was also knowledgeable about the marine life and organized snorkeling trips for us. Our only feedback would be to provide some bug repellent, as we had a few mosquito encounters. But it's a small price to pay for paradise. This Airbnb is not just a stay, it's an experience, and we're grateful for the memories.",
        stars: 4,
      },
      {
        spotId: 49,
        userId: 3,
        review: "From the moment we stepped into this Airbnb, we knew we were in for a treat. Perched on a cliff, it offered unparalleled views of the mountains and valley below. The house itself was an architectural masterpiece, a perfect amalgamation of contemporary design and natural elements. The vast living area had a vaulted ceiling, with skylights flooding the space with natural light. The decor was tasteful, with handcrafted furniture and original artworks adorning the walls. The kitchen was a chef's haven, with a commercial-grade stove and a walk-in pantry. We enjoyed cooking meals, using fresh produce from the host's organic farm. The bedrooms were havens of tranquility, with floor-to-ceiling windows and plush bedding. We woke up to the sound of birds and the sight of mist-covered mountains. The bathrooms were luxurious, with marble fittings and rain showers. The outdoor area was equally impressive, featuring a heated pool, cabanas, and a barbecue station. We spent our days hiking, exploring the nearby waterfalls, and evenings by the fire pit, stargazing. The host was incredible, offering insights into the local culture and arranging adventure trips for us. She also organized a traditional cooking class, where we learned to make local delicacies. Our only gripe was the intermittent power outages, but the house had a backup generator, so it was never an issue. This Airbnb is more than just a place to stay; it's a destination in itself. We left with our souls rejuvenated and a promise to return.",
        stars: 3,
      },
      {
        spotId: 50,
        userId: 4,
        review: "Loved the house! Centrally located, beautifully furnished, and extremely clean. The host was accommodating. Will definitely return on my next visit.",
        stars: 3,
      },
      {
        spotId: 51,
        userId: 5,
        review: "Great location, just minutes away from downtown. The house had a cozy ambiance, and the host was very communicative. The kitchen was fully equipped, making our stay comfortable. Highly recommended.",
        stars: 5,
      },
      {
        spotId: 52,
        userId: 1,
        review: "What a gem! This Airbnb had a stunning view of the ocean. The interior was modern and had all the amenities we needed. The host gave us local tips that were very useful. A bit pricey, but worth every penny.",
        stars: 3,
      }
    ];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {


    await queryInterface.bulkInsert(options, data, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      spotId: {
        [Op.in]: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
          11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
          51, 52
        ]
      }
    }, {});
  }
};
