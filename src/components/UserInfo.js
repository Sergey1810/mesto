export default class UserInfo{
  constructor(name, job, avatar){
    this._name = name;
    this._job = job
    this._avatar = avatar
  }

  getUserInfo(){
    const data = {
      name : this._name,
      job : this._job, 
      avatar: this._avatar
    }
    return data
  }

  setUserInfo(item){
    this._name.textContent = item.name;
    this._job.textContent = item.job;
  }

  setUserAvatar(data){
    this._avatar.src = `${data.link}`
    this._avatar.alt = data.name
  }
}