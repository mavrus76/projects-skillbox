export default class Worker {
  constructor(name, surname, lastName, workStart, BirthDate, post) {
    this.name = name;
    this.surname = surname;
    this.lastName = lastName;
    this.workStart = workStart;
    this.birthDate = BirthDate;
    this.post = post;
  }

  get fullName() {
    return `${this.surname} ${this.name} ${this.lastName}`;
  }

  getWorkPeriod() {
    const currentTime = new Date();
    return currentTime.getFullYear() - this.workStart;
  }

  getBirthDateString() {
    const yyyy = this.birthDate.getFullYear();
    let mm = this.birthDate.getMonth();
    let dd = this.birthDate.getDate();
    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${dd}`;
    return `${dd}.${mm}.${yyyy}`;
  }

  getAge() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const mm = today.getMonth() - this.birthDate.getMonth();
    if (mm < 0 || (mm === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
