<template>
  <div>
    <label for="category"></label>
    <select id="category" v-model="selectedCategory" data-category>
      <option disabled value="">Select category</option>
      <option>cafe</option>
    </select>
    <label for="price"></label>
    <input type="text" id="price" v-model="price" data-price />
    <button @click="calculateDiscountAmountByCard">Calculate</button>
    {{ cardBenefitAmountsForPrice.length }}
    <ul>
      <li
        class="result"
        v-for="(value, index) of cardBenefitAmountsForPrice"
        :key="index"
      >
        <span class="card">{{ value.card }}</span>
        <span class="type">{{ value.type }}</span>
        <span class="amount">{{ value.amount }}</span>
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
      selectedCategory: "",
      cardCategoryBenefits: [
        {
          card: "hyundai",
          type: "point",
          categories: ["cafe", "shopping", "oil"],
          benefits: [
            {
              category: "cafe",
              rate: "1%"
            },
            {
              category: "shopping",
              rate: "2%"
            }
          ]
        },
        {
          card: "lotte",
          type: "discount",
          categories: ["cafe", "transportation", "internet"],
          benefits: [
            {
              category: "cafe",
              rate: "50%",
              limit: "10000"
            },
            {
              category: "transportation",
              rate: "10%",
              limit: "5000"
            },
            {
              category: "internet",
              rate: "10%",
              limit: "5000"
            }
          ]
        }
      ],
      cardBenefitAmountsForPrice: []
    };
  },
  methods: {
    calculateDiscountAmountByCard() {
      this.cardBenefitAmountsForPrice = this.cardCategoryBenefits
        .filter(info => info.categories.includes(this.selectedCategory))
        .map(info => ({
          card: info.card,
          type: info.type,
          ...info.benefits.find(b => b.category === this.selectedCategory)
        }))
        .map(info => {
          return {
            ...info,
            amount: this.price * (parseFloat(info.rate) / 100)
          };
        });
    }
  }
};
</script>

<style scoped></style>
