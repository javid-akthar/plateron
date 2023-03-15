
# Plateron Assignment

.

## Getting Started

### Prerequisites

Before you can run this project, you need to have mongoDb running in the machine

### Installing

To run the application, make sure MongoDB is started on your machine and then run the following command:


1. Clone the repository to your local machine using the following command:
-  git clone https://github.com/javid-akthar/plateron.git

- install packages using npm install
- run the application using npm start


## API
### GET API to get the list of categories

```

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("http://localhost:3000/categories/smartPhone?date=15-03-2023", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```  

### POST API to get make the sheduleDiscount

```
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "discountData": [
    {
      "categoryName": "smartPhone",
      "brandName": [
        "apple"
      ],
      "discountTimeType": "day",
      "days": [
        "sunday",
        "monday",
        "wednesday"
      ],
      "Location": "India",
      "CountryTimeFormat": "IST",
      "startTime": "12:30:00",
      "endTime": "16:30:00",
      "discountPercentage": "2"
    },
    {
      "categoryName": "laptop",
      "brandName": [
        "lenova"
      ],
      "discountTimeType": "date",
      "Location": "India",
      "CountryTimeFormat": "IST",
      "startDate": "15-03-2023",
      "endDate": "18-03-2023",
      "startTime": "12:30:00",
      "endTime": "16:30:00",
      "discountPercentage": "2"
    }
  ]
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:3000/sheduleDiscount", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```



