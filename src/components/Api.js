import { data } from "autoprefixer";

export class Api {
    constructor(options) {
      this.baseUrl = options.baseUrl;
      this.headers = options.headers;
      this.profileTitle = document.querySelector('.profile__title');
      this.profileAbout = document.querySelector('.profile__subtitle')
    }
    _isResponse(res){
        if(res.ok){
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfo(){
       return fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers
            })
            .then((res) => {return this._isResponse(res)})
        }
  
    getInitialCards() {
       return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
        .then((res) => {return this._isResponse(res)})
    }

    setUserInfo(name, about){
    return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
              name: `${name}`,
             about: `${about}`
            })})
            .then(res => {return this._isResponse(res)})
    }

    setAddCard(name, link){
    return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
              name: `${name}`,
              link: `${link}`
             })   
         })
         .then(res => {return this._isResponse(res)})
        }

    setDeleteCard(id){ 
    return fetch(`${this.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
            })
            .then(res => {return this._isResponse(res)})
    }  

    setAddLike(id){
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this.headers,
             }) 
             .then(res => {return this._isResponse(res)})
    }

    setRemoveLike(id){
          return fetch(`${this.baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this.headers,
             })
             .then(res => {return this._isResponse(res)})
    }

    setChangeAvatar(url){
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
        avatar: `${url}`
        })})
      .then(res => {return this._isResponse(res)})
    }
  }
  
