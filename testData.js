const smartphone = {
  category: "smartPhone",
  itemDetails: [
    {
      brand: "apple",
      item: [{
        itemName: "iPhone 13",
        totalprice: 999,
      },
      {
        itemName: "iPhone 1",
        totalprice: 200,
      },
      {
        itemName: "iPhone 2",
        totalprice: 250,
      },
      {
        itemName: "iPhone 3",
        totalprice: 300,
      },
      {
        itemName: "iPhone 4",
        totalprice: 400,
      },
      {
        itemName: "iPhone 5",
        totalprice: 500,
      }] 
      
    },
    {
      brand: "samsung",
      item: [{
        itemName: "Galaxy S21",
        totalprice: 799,
      },
      {
        itemName: "Galaxy S22",
        totalprice: 899,
      },
      {
        itemName: "Galaxy S23",
        totalprice: 499,
      },
      {
        itemName: "Galaxy S24",
        totalprice: 599,
      },
       {
        itemName: "Galaxy S25",
        totalprice: 699,
      }],
    },
  ],
};

const laptop = {
    category: "laptop",
    itemDetails: [
        {
            brand: "lenova",
            item: [ {
                itemName: "ThinkPad X1 Carbon",
                totalprice: 1500,
            },
            {
                itemName: "ThinkPad X2 Carbon",
                totalprice: 1400,
            },
            {
                itemName: "ThinkPad X3 Carbon",
                totalprice: 1250,
            },
            {
                itemName: "ThinkPad X4 Carbon",
                totalprice: 1600,
            },
            {
                itemName: "ThinkPad X5 Carbon",
                totalprice: 1700,
            }]
        },
        {
            brand: "dell",
            item:[ {
                itemName: "XPS 13",
                totalprice: 1200,
            },
            {
                itemName: "XPS 12",
                totalprice: 1100,
            },
            {
                itemName: "XPS 11",
                totalprice: 1300,
            },
            {
                itemName: "XPS 10",
                totalprice: 1200,
            },
            {
                itemName: "XPS 9",
                totalprice: 1100,
            }]
        }
    ]
}

module.exports = {smartphone, laptop}

