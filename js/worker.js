export default class Worker {
  constructor(
    lastName,
    firstName,
    middleName,
    birthDate,
    education,
    gender,
    dismissalDate
  ) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.middleName = middleName;
    this.birthDate = birthDate;
    this.education = education;
    this.gender = gender;
    this.dismissalDate = dismissalDate;
  }

  get fullName() {
    return `${this.lastName} ${this.firstName} ${this.middleName}`;
  }

  getAge() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const month = today.getMonth() - this.birthDate.getMonth();
    month < 0 || (month === 0 && today.getDate() < this.birthDate.getDate())
      ? age--
      : age;
    return age;
  }

  getBirthDateString() {
    const today = this.birthDate;
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    dd < 10 ? (dd = "0" + dd) : dd;
    mm < 10 ? (mm = "0" + mm) : mm;
    return dd + "." + mm + "." + yyyy;
  }

  getCurrentTime() {
    const output = new Date().toLocaleString().replace(",", "");
    return output;
  }
}
