'use strict';

let options = {};
options.tableName = 'SpotImages'
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        spotId: 1,
        url: "https://thumbs.dreamstime.com/b/beautiful-house-tree-against-cloudy-blue-sky-background-54044451.jpg",
        preview: true
      },
      {
        spotId: 1,
        url: "https://thumbs.dreamstime.com/b/beautiful-house-tree-against-cloudy-blue-sky-background-54044451.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://thumbs.dreamstime.com/b/beautiful-house-tree-against-cloudy-blue-sky-background-54044451.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://thumbs.dreamstime.com/b/beautiful-house-tree-against-cloudy-blue-sky-background-54044451.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://thumbs.dreamstime.com/b/beautiful-house-tree-against-cloudy-blue-sky-background-54044451.jpg",
        preview: false
      },
      {
        spotId: 1,
        url: "https://thumbs.dreamstime.com/b/beautiful-house-tree-against-cloudy-blue-sky-background-54044451.jpg",
        preview: false
      },
      {
        spotId: 2,
        url: "https://media.istockphoto.com/id/1147674296/photo/single-family-new-construction-home-in-suburb-neighborhood-in-the-south.webp?b=1&s=170667a&w=0&k=20&c=dhqLHRQolgIK7Q6n54N7d_pwCpkLhRl-0PFS1VMb0lU=",
        preview: false
      },
      {
        spotId: 3,
        url: "https://t3.ftcdn.net/jpg/01/62/06/40/360_F_162064034_HI2YEgV7km3HMy0rccQczKH2vvpI4OnB.jpg",
        preview: true
      },
      {
        spotId: 4,
        url: "https://image-cdn.carrot.com/uploads/sites/12149/2012/01/houston-house-2-hero.jpg",
        preview: true
      },
      {
        spotId: 5,
        url: "https://thumbs.dreamstime.com/b/beautiful-modern-house-cement-view-garden-loft-beautiful-modern-house-cement-view-garden-125945530.jpg",
        preview: true
      },
      {
        spotId: 6,
        url: "https://media.gettyimages.com/id/128502214/photo/classic-turn-of-the-century-american-house.jpg?s=612x612&w=gi&k=20&c=i4olPZuStzxhaUt8Py7FzUSRaub86j2UdvezcLPtThI=",
        preview: true
      },
      {
        spotId: 7,
        url: "https://assets-us-01.kc-usercontent.com/0542d611-b6d8-4320-a4f4-35ac5cbf43a6/57134553-0077-4e93-8cfd-58895d271ef8/homeowners-insurance-facebook.jpg",
        preview: true
      },
      {
        spotId: 8,
        url: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
        preview: true
      },
      //the best house imo
      {
        spotId: 9,
        url: "https://previews.123rf.com/images/jroblesart/jroblesart1407/jroblesart140700036/30146145-kids-crayon-drawing-of-sunny-day-house-and-man-and-car.jpg",
        preview: true
      },
      {
        spotId: 10,
        url: "https://www.thehousedesigners.com/images/uploads/SiteImage-Landing-modern-house-plans-1.webp",
        preview: true
      },
      {
        spotId: 11,
        url: "https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
        preview: true
      },
      {
        spotId: 12,
        url: "https://www.mydomaine.com/thmb/CaWdFGvTH4-h1VvG6tukpKuU2lM=/3409x0/filters:no_upscale():strip_icc()/binary-4--583f06853df78c6f6a9e0b7a.jpeg",
        preview: true
      },
      {
        spotId: 13,
        url: "https://images.coolhouseplans.com/plans/44207/44207-b600.jpg",
        preview: true
      },
      {
        spotId: 14,
        url: "https://lovehomedesigns.com/wp-content/uploads/2022/01/cute-house-012522.jpg.webp",
        preview: true
      },
      {
        spotId: 15,
        url: "https://res.cloudinary.com/brickandbatten/images/f_auto,q_auto/v1675439464/wordpress_assets/SmallHouseExteriors-social-share-B-LOGO/SmallHouseExteriors-social-share-B-LOGO.jpg?_i=AA",
        preview: true
      },
      {
        spotId: 16,
        url: "https://media.gettyimages.com/id/1269776313/photo/suburban-house.jpg?s=170667a&w=gi&k=20&c=5ZBcGrl9K7vU7N61uFBmURHV6ebj8L6Tp3_pMOAlhq0=",
        preview: true
      },
      {
        spotId: 17,
        url: "https://www.jamesedition.com/stories/wp-content/uploads/2022/03/mansions_main_fin.jpg",
        preview: true
      },
      {
        spotId: 18,
        url: "https://cdn.houseplansservices.com/content/oanrn2hpo2onko9gr94416qock/w991x660.jpg?v=10",
        preview: true
      },
      {
        spotId: 19,
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        preview: true
      },
      {
        spotId: 20,
        url: "https://www.thehousedesigners.com/images/uploads/SiteImage-Landing-house-plans-with-photos-1.webp",
        preview: true
      },
      {
        spotId: 21,
        url: "https://housing.com/news/wp-content/uploads/2022/11/shutterstock_1715891752-1200x700-compressed.jpg",
        preview: true
      },
      {
        spotId: 22,
        url: "https://hips.hearstapps.com/hmg-prod/images/edc100121fernandez-005-1631202315.jpg?crop=1.00xw:0.594xh;0,0.296xh&resize=1200:*",
        preview: true
      },
      {
        spotId: 23,
        url: "https://res.cloudinary.com/brickandbatten/images/f_auto,q_auto/v1659367745/wordpress_assets/Contemporary-House-57123-5-2_43096e0838/Contemporary-House-57123-5-2_43096e0838.jpg?_i=AA",
        preview: true
      },
      {
        spotId: 24,
        url: "https://media.architecturaldigest.com/photos/5ce2fed704c41e723f9a8839/master/w_1600%2Cc_limit/214%2520Bubble%2520Palace.jpg",
        preview: true
      },
      {
        spotId: 25,
        url: "https://s42814.pcdn.co/wp-content/uploads/2020/09/iStock_185930591-scaled.jpg.optimal.jpg",
        preview: true
      },
      {
        spotId: 26,
        url: "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQZUkwT6XhdDnNqAsPrZiQWWHvhpJo0cviRndWweNeFE0G6sOOa7ltzrwXSocCIsqRqAcruHZtEk-MBx_qLAJz-43yAbJAJXmEYKEMD78GRjJ3ro5x5T97jaAj0NwMiaHvO4mNGLRmwNAPE2yA0LWWV1UfQI.jpg?r=48b",
        preview: true
      },
      {
        spotId: 27,
        url: "https://shrinkthatfootprint.com/wp-content/uploads/2023/07/image-95.png",
        preview: true
      },
      {
        spotId: 28,
        url: "https://hips.hearstapps.com/hmg-prod/images/victorian-style-house-4-1652804696.jpg?crop=1.00xw:0.755xh;0,0.0432xh&resize=640:*",
        preview: true
      },
      {
        spotId: 29,
        url: "https://res.akamaized.net/domain/image/upload/t_web/v1538713881/bigsmall_Mirvac_house2_twgogv.jpg",
        preview: true
      },
      {
        spotId: 30,
        url: "https://www.hollywoodreporter.com/wp-content/uploads/2023/03/image_h_01-H-2023.jpg",
        preview: true
      },
      {
        spotId: 31,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqmvq68wYYVDhI99VdI5PpHsUzY6R4GkeYo6XoRlTfNdBsBNnzeGGAd44ccPft46YTlk&usqp=CAU",
        preview: true
      },
      {
        spotId: 32,
        url: "https://hips.hearstapps.com/hmg-prod/images/painted-ladies-at-alamo-square-san-francisco-royalty-free-image-1658427804.jpg?crop=0.949xw:0.727xh;0,0.260xh&resize=640:*",
        preview: true
      },
      {
        spotId: 33,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO8DVfY_9g9ChlYAnmy1P7vVtF9QdKpAB0nc7giiGsStmDOpIgqMVnQSQ9dNm3RHkng58&usqp=CAU",
        preview: true
      },
      {
        spotId: 34,
        url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
        preview: true
      },
      {
        spotId: 35,
        url: "https://thumbs.dreamstime.com/b/luxury-house-beautiful-landscaping-two-car-garage-sunny-day-home-exterior-77903638.jpg",
        preview: true
      },
      {
        spotId: 36,
        url: "https://global-uploads.webflow.com/5cd1e68968db65ba07de7bfb/5fdd0cfb47e012f15dcf2379_Fritz_TH_30.jpg",
        preview: true
      },
      {
        spotId: 37,
        url: "https://cdn.houseplansservices.com/product/do996bt7sq25eptckqlu9n0hj1/w800x533.jpg?v=2",
        preview: true
      },
      {
        spotId: 38,
        url: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg",
        preview: true
      },
      {
        spotId: 39,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThlD_UP4eiZaxEW41VhoDej2IwjuUQi10vdJY_jZroyau61t2lmfXqizlLNP4z05INNh8&usqp=CAU",
        preview: true
      },
      {
        spotId: 40,
        url: "https://assets.architecturaldesigns.com/plan_assets/343311829/large/81723AB_Render-01_1687268128.jpg",
        preview: true
      },
      {
        spotId: 41,
        url: "https://media.gettyimages.com/id/147205632/photo/modern-home-with-swimming-pool.jpg?s=612x612&w=gi&k=20&c=KziR75bRl6md69oB-cEvNv_0ak-I-f6kmkUpKVQBH-E=",
        preview: true
      },
      {
        spotId: 42,
        url: "https://static.dezeen.com/uploads/2020/02/house-in-the-landscape-niko-arcjitect-architecture-residential-russia-houses-khurtin_dezeen_2364_hero.jpg",
        preview: true
      },
      {
        spotId: 43,
        url: "https://na.rdcpix.com/34a02dcc828a773be69e2441fa536593w-c1243291495srd_q80.jpg",
        preview: true
      },
      {
        spotId: 44,
        url: "https://assets-news.housing.com/news/wp-content/uploads/2022/01/11172338/World%E2%80%99s-15-Most-Beautiful-Houses-That-Will-Leave-You-Awestruck-featured-shutterstock_1182743467-1200x700-compressed.jpg",
        preview: true
      },
      {
        spotId: 45,
        url: "https://contentgrid.homedepot-static.com/hdus/en_US/DTCCOMNEW/Articles/painting-the-exterior-of-our-house-with-the-projectcolor-app-image-13.jpg",
        preview: true
      },
      {
        spotId: 46,
        url: "https://www.investopedia.com/thmb/4RQmhzxiZBvegLOwuRcRMxh6nLk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-framed-glass-conservatory-attached-to-house-at-sunset--quebec--canada-1057393770-f70cde48f27847009c03065faa2d9bee.jpg",
        preview: true
      },
      {
        spotId: 47,
        url: "https://www.oldhousedreams.com/wp-content/uploads/2023/07/01-214-E-Rose-St.jpg",
        preview: true
      },
      {
        spotId: 48,
        url: "https://www.thehousedesigners.com/images/plans/AMD/bulk/6655/1269a-front-rendering_m.jpg",
        preview: true
      },
      {
        spotId: 49,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcKZVOYDfxQccy7q-SUtC13LRqa7vjnTxJKDBXBdqOLrlsE9nZOJCmNvH4fFPzQYyWhEw&usqp=CAU",
        preview: true
      },
      {
        spotId: 50,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnrqnrU6V7jheO--T0Pff6ErS9gGcXEQ4yQ6pEUK7Uv66sK2eZP7bcSuGHehs5f6wWLu4&usqp=CAU",
        preview: true
      },
      {
        spotId: 51,
        url: "https://static.rdc.moveaws.com/images/hero/AIDH/mobile-2x.jpg",
        preview: true
      },
      {
        spotId: 52,
        url: "https://s.oneroof.co.nz/image/88/d6/88d621a7632afc51fa6707f08ae382b3.jpg?x-oss-process=image/quality,q_80",
        preview: true
      },
    ];

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
