<template>
  <div>
    <label for="category"></label>
    <select id="category" v-model="selected" data-category>
      <option disabled value="">Select category</option>
      <option>cafe</option>
    </select>
    <label for="price"></label>
    <input type="text" id="price" v-model="price" data-price />
    <button @click="calculateDiscountAmountByCard">Calculate</button>
    {{ cardAmountMapAfterDiscount.length }}
    <ul id="discountAmountResult">
      <li v-for="(value, index) in cardAmountMapAfterDiscount" :key="index">
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "BenefitsCalculator",
    data() {
      return {
        price: 0,
        selected: "",
        cardCategoryBenefits: new Map([
          [
            "cafe",
            new Map([
              ["hyundai", { discount: "10%" }],
              ["lotte", { discount: "50%" }]
            ])
          ],
          [
            "shopping",
            new Map([
              ["hyundai", { discount: "0%" }],
              ["lotte", { discount: "20%" }]
            ])
          ]
        ]),
        cardAmountMapAfterDiscount: []
      };
    },
    methods: {
      calculateDiscountAmountByCard() {
        const selectedCategoryCardMap = this.cardCategoryBenefits.get(this.selected);
        this.cardAmountMapAfterDiscount = Array.from(
                selectedCategoryCardMap.entries()
        )
        .filter(entry => entry[1].discount)
        .map(entry => ({
          card: entry[0],
          discountAmount: this.price * (parseFloat(entry[1].discount) / 100)
        }));
      }
    }
  };
</script>

<style scoped></style>
