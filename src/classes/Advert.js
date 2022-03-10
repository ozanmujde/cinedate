import React from 'react';

export class Advert {
  constructor(advertId,ownerId, date, registrationDate, lastUpdateDate, quota, attendeePreference, attendeeIds, status, filmId) {
    this.advertId = advertId;
    this.ownerId = ownerId;
    this.date = date;
    this.registrationDate = registrationDate;
    this.lastUpdateDate = lastUpdateDate;
    this.quota = quota;
    this.attendeePreference = attendeePreference;
    this.attendeeIds = attendeeIds;
    this.status = status;
    this.filmId = filmId;
  }

}

export default Advert;
