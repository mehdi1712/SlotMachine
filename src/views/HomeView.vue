<script setup lang="ts">
import { useCreditStore } from "@/stores/credit";
import { onMounted, ref } from "vue";
import Toast from "@/components/partials/toast.vue";
import useRandom from "@/composables/useRandom";

const random = useRandom();

const creditStore = useCreditStore();
let resultSpin = ref([]);
let toastStatus = ref(false);
let toastMessage = ref("");
let toastType = ref("");

const items = ["🍊", "🍉", "🍒", "🍋"];
let doors;

function init(firstInit = true, groups = 1, duration = 1) {
  doors = document.querySelectorAll(".door");
  resultSpin.value = []; //reset result

  for (const door of doors) {
    if (firstInit) {
      door.dataset.spinned = "0";
    } else if (door.dataset.spinned === "1") {
      return;
    }

    const boxes = door.querySelector(".boxes");
    const boxesClone = boxes.cloneNode(false);
    const pool = ["❓"];

    if (!firstInit) {
      const arr = [];
      for (let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...items);
      }
      pool.push(...shuffle(arr));

      boxesClone.addEventListener(
        "transitionstart",
        function () {
          door.dataset.spinned = "1";
          this.querySelectorAll(".box").forEach((box) => {
            box.style.filter = "blur(1px)";
          });
        },
        { once: true }
      );

      boxesClone.addEventListener(
        "transitionend",
        function () {
          this.querySelectorAll(".box").forEach((box, index) => {
            box.style.filter = "blur(0)";
            if (index > 0) this.removeChild(box);
          });
        },
        { once: true }
      );
    }

    for (let i = pool.length - 1; i >= 0; i--) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.style.width = door.clientWidth + "px";
      box.style.height = door.clientHeight + "px";
      box.textContent = pool[i];
      boxesClone.appendChild(box);
    }
    boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
    boxesClone.style.transform = `translateY(-${
      door.clientHeight * (pool.length - 1)
    }px)`;
    door.replaceChild(boxesClone, boxes);
  }
}

async function spin() {
  console.log("spin called");

  if (creditStore.checkCredit() !== 0) {
    // have credit

    console.log("in if 1 ");

    init();
    init(false, 1, 2);
    for (const door of doors) {
      const boxes = door.querySelector(".boxes");
      resultSpin.value.push(boxes.childNodes[0].getInnerHTML()); // save result spin
      const duration = parseInt(boxes.style.transitionDuration);
      boxes.style.transform = "translateY(0)";
      await new Promise((resolve) => setTimeout(resolve, duration * 100));
    }
    if (checkWin()) {
      // win and check 3 state

      let statusWin = true; // if true user win

      if (creditStore.checkCredit() === 2) {
        statusWin = false;
        random.getChancePercentage(30) ? spin() : (statusWin = true); // chance 30% to role again
      } else if (creditStore.checkCredit() === 3) {
        statusWin = false;
        random.getChancePercentage(60) ? spin() : (statusWin = true); // chance 60% to role again
      }

      if (statusWin)
        setTimeout(() => {
          toastMessage.value =
            "congratulations ! You win and ten credits are added to you";
          toastType.value = "success";
          toastStatus.value = true;
          creditStore.seTCreditForWin();
        }, 1600);
    } else {
      // lose
      setTimeout(() => {
        toastMessage.value =
          "Unfortunately, you lost and one credit is missing from you :(";
        toastType.value = "danger";
        toastStatus.value = true;
        creditStore.seTCreditForLose();
      }, 1600);
    }
  } else {
    /// no credit
    toastMessage.value =
      "Unfortunately, you dont have more credit. please Charge your wallet";
    toastType.value = "danger";
    toastStatus.value = true;
  }
}

function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

function checkWin() {
  return resultSpin.value.every((element) => {
    if (element === resultSpin.value[0]) {
      return true;
    } else return false;
  });
}

onMounted(() => {
  init();
});
</script>

<template>
  <div class="lg:flex lg:items-center flex-col w-full">
    <div
      id="app"
      class="w-full h-full bg-[#1a2b45] flex flex-col items-center justify- py-10 rounded-lg"
    >
      <div class="doors flex">
        <div class="door">
          <div class="boxes">
            <!-- <div class="box">?</div> -->
          </div>
        </div>

        <div class="door">
          <div class="boxes">
            <!-- <div class="box">?</div> -->
          </div>
        </div>

        <div class="door">
          <div class="boxes">
            <!-- <div class="box">?</div> -->
          </div>
        </div>
      </div>

      <div class="buttons flex gap-x-4 mt-8">
        <button
          @click="spin"
          type="button"
          class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Roll !
        </button>
        <button
          @click="init()"
          type="button"
          class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Reset
        </button>
      </div>
    </div>
    <div class="root-toast mt-4">
      <Toast
        :type="toastType"
        :message="toastMessage"
        @on-close="toastStatus = false"
        v-if="toastStatus"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.door {
  background: #fafafa;
  width: 100px;
  height: 110px;
  overflow: hidden;
  border-radius: 5px;
  margin: 5px;
  font-size: 78px;
}

.boxes {
  /* transform: translateY(0); */
  transition: transform 1s ease-in-out;
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 78px !important;
}
</style>