import { ref } from "vue";
import { defineStore } from "pinia";

export const useCreditStore = defineStore("credit", () => {
  const credit = ref(localStorage.getItem('credit') ? Number(localStorage.getItem('credit')) : 10)

  function getCredit() {
    return credit.value
  }
  function seTCredit(_credit: number) {

    credit.value += _credit
    setCreditToLocalStorage()
  }
  function seTCreditForWin() {
    credit.value += 20
    setCreditToLocalStorage()
  }
  function seTCreditForLose() {
    credit.value--
    setCreditToLocalStorage()
  }
  function setCreditToLocalStorage() {
    localStorage.setItem("credit", '' + credit.value);
  }
  function checkCredit() {
    if (credit.value <= 0) {
      return 0   //noCredit
    }
    else if (credit.value > 0 && credit.value < 40) {
      return 1  //level 1 random all spins
    }
    else if (credit.value >= 40 && credit.value < 60) {
      return 2  //level 2 random 30% chance to re spin
    }
    else if (credit.value > 60) {
      return 3  //level 3 random 60% chance to re spin
    }
  }


  return { getCredit, seTCredit, seTCreditForLose, seTCreditForWin, checkCredit };
});
