export default class UserInfo{
    constructor(name, job){
      this._name = name;
      this._job = job
    }

    getUserInfo(){
      const data = {
        name : this._name.textContent,
        job : this._job.textContent 
      }
      return data
    }

    setUserInfo(item){
      this._name.textContent = item.name;
      this._job.textContent = item.job;
    }
}