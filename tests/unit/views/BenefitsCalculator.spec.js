import { shallowMount } from "@vue/test-utils";

import BenefitsCalculator from "../../../src/views/BenefitsCalculator";

describe("Calculate benefits", () => {
  let wrapper = shallowMount(BenefitsCalculator);

  it("given all cards gives the same category's benefit, when user selects the category and enter price, then sees point or discount amount of selected category by card.", async () => {
    wrapper.setData({
      cardCategoryBenefits: [
        {
          card: "hyundai",
          type: "point",
          categories: ["cafe"],
          benefits: [
            {
              category: "cafe",
              rate: "1%"
            }
          ]
        },
        {
          card: "lotte",
          type: "discount",
          categories: ["cafe"],
          benefits: [
            {
              category: "cafe",
              rate: "50%"
            }
          ]
        }
      ]
    });

    wrapper.find("[data-category]").setValue("cafe");
    wrapper.find("[data-price]").setValue(10000);
    wrapper.find("button").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.findAll(".result").length).toBe(2);

    expect(
      wrapper
        .findAll(".result")
        .at(0)
        .find(".amount")
        .text()
    ).toBe("100");

    expect(
      wrapper
        .findAll(".result")
        .at(1)
        .find(".amount")
        .text()
    ).toBe("5000");
  });

  it("given cards gives different category's benefit, when user selects a category and enter price, then sees the only card applied by selected category's benefit.", async () => {
    wrapper.setData({
      cardCategoryBenefits: [
        {
          card: "hyundai",
          type: "point",
          categories: ["cafe"],
          benefits: [
            {
              category: "cafe",
              rate: "1%"
            }
          ]
        },
        {
          card: "lotte",
          type: "discount",
          categories: ["transportation"],
          benefits: [
            {
              category: "transportation",
              rate: "10%",
              limit: "5000"
            }
          ]
        }
      ]
    });

    wrapper.find("[data-category]").setValue("cafe");
    wrapper.find("[data-price]").setValue(10000);
    wrapper.find("button").trigger("click");
    await wrapper.vm.$nextTick();

    const resultArray = wrapper.findAll(".result");
    const firstCardBenefit = resultArray.at(0);

    expect(resultArray.length).toBe(1);

    expect(firstCardBenefit.find(".card").text()).toBe("hyundai");

    expect(firstCardBenefit.find(".amount").text()).toBe("100");
  });
});
