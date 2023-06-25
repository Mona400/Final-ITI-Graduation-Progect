interface Promotion {
  "id": number,
  "title": string,
  "description": string,
  "date": Date,
  "days": number,
  "hours": number,
  "minutes": number,
  "seconds": number,
  "imageUrl": string,
  "priceBefore": number,
  "priceAfter": number
}

interface ExpirationDate {
  days:number | string,
  date:Date,
hours:number,
mins:number,
secs:number
}


export{ Promotion , ExpirationDate}
