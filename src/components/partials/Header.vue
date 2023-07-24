<script setup lang="ts">
import Modal from "@/components/partials/modal.vue";
import { useCreditStore } from "@/stores/credit";
import { ref, watch } from "vue";
import useRandom from "@/composables/useRandom";

let chargeCreditInput = ref(0);
const creditStore = useCreditStore();
const random = useRandom();
function handleCharge() {
  if (chargeCreditInput.value) {
    creditStore.seTCredit(chargeCreditInput.value);
  }
}
function randomButtonClick() {
  let rootBtnModal = document.getElementById("root-button-cashout");
  let resultChance = random.getChancePercentage(50)
    ? "transform"
    : random.getChancePercentage(40)
    ? "disable"
    : "clickable";
  console.log("resultChance", resultChance);

  if (resultChance === "transform") {
    rootBtnModal.style.transitionDelay = "200ms";
    //  button moves in a random direction by 300px (X and Y directions)
    if (random.getChancePercentage(50)) {
      rootBtnModal.style.transform = "translateX(300px)";
    } else {
      rootBtnModal.style.transform = "translateY(300px)";
    }
  } else if (resultChance === "disable") {
    rootBtnModal.style.pointerEvents = "none";
    rootBtnModal.style.cursor = "no-drop";
  }
}
function resetButtonStyles() {
  let rootBtnModal = document.getElementById("root-button-cashout");

  rootBtnModal.style.pointerEvents = "auto";
  rootBtnModal.style.cursor = "unset";
  rootBtnModal.style.transform = "none";
}
let hover = ref(false);

watch(hover, (newValue) => {
  if (newValue) randomButtonClick();
  else resetButtonStyles();
});
</script>

<template>
  <header
    class="h-fit bg-amber-400 w-full px-4 xl:px-20 pt-4 pb-10 flex flex-col gap-y-10"
  >
    <span class="text-3xl col-span-3 w-full text-center">Slot Machine </span>
    <div class="root-actions grid grid-cols-5 gap-x-8">
      <div
        id="root-button-cashout"
        class="w-inherit h-fit"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
      >
        <Modal
          button-modal-class="text-white bg-gradient-to-br w-full from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`"
          textButtonModal="Cash Out!"
          modalId="cahsOutModal"
        >
          <template #header>
            <h2 class="text-lg font-bold">Cash Out !</h2>
          </template>
          <template #body>
            <p>Are You Sure cashout {{ creditStore.getCredit() }} $</p>
          </template>
          <template #footer>
            <button
              type="button"
              class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Get Cash
            </button>
          </template>
        </Modal>
      </div>

      <span class="credits text-2xl col-span-3 text-center">
        Your Credit :
        <span class="text-blue-600 text-2xl font-semibold font-serif"
          >{{ creditStore.getCredit() }} $</span
        >
      </span>
      <Modal
        button-modal-class="`text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`"
        textButtonModal="Charg Wallet!"
        modalId="chargeWalletModal"
      >
        <template #header>
          <h2 class="text-lg font-bold">ChargWallet{{ chargeCreditInput }}</h2>
        </template>
        <template #body>
          <div>
            <label
              for="creditValue"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Credit Value</label
            >
            <input
              type="number"
              id="creditValue"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              pattern=""
              required
              v-model="chargeCreditInput"
            />
          </div>
        </template>
        <template #footer>
          <button
            data-modal-hide="chargeWalletModal"
            @click="handleCharge"
            type="button"
            class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Charge
          </button>
        </template>
      </Modal>
    </div>
  </header>
</template>
<style lang="sass" scoped>
</style>