import React from 'react';

export class User {
  constructor(email, name, surname, sex, adverts, age, location, bio, profilePhoto, likedFilms, watchedFilms) {
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.sex = sex;
    this.adverts = adverts;
    this.age = age;
    this.location = location;
    this.bio = bio;
    this.profilePhoto = profilePhoto;
    this.likedFilms = likedFilms;
    this.watchedFilms = watchedFilms;
  }

}

export default User;
