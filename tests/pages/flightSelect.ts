import { expect } from "@playwright/test";
import { parsePrice } from "../../helpers/utils";
import { BasePage } from "./basePage";

export class FlightSelectPage extends BasePage {
 

  async selectUSBanglaFlight() {
    const checkbox = this.page.locator('[type="checkbox"]').nth(1);
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.check();
    const priceText = await this.page.locator(".Flight_line_spacing__INn4m").last().textContent();
    console.log(`Selected Price Text: ${priceText}`);
    return priceText;
  }

  async selectBookingFlight() {
    await this.page.locator(".btn.btn_book_oneway.custom_btn").last().click();
  }

  async verifyReviewFareModalAppear() {
    await expect(this.page.locator("#offcanvasRight")).toContainText("Review fare to Dhaka");
  }

  async verifyFareAmount(priceText: string) {
    const selectedPrice = parsePrice(priceText);
    const totalText = await this.page.locator(".total_a").textContent();
    if (totalText === null) {
      throw new Error("Total price text not found");
    }
    const totalPrice = parsePrice(totalText);


    console.log(`Selected Price: ${selectedPrice}`);
    console.log(`Total Price: ${totalPrice}`);


    if (selectedPrice === totalPrice) {
      console.log(" Prices match");
    } else {
      console.log("Price mismatch");
    }
  }


  async continueToBooking() {
    await this.page.locator('[data-bs-target="#offcanvasRight1"]').click();
  }

  async closeSignInModal() {
    await this.page.getByRole('button', { name: 'Close' }).nth(1).click();
  }

  async allPriceforUSBanglaFlight() {
    const priceElements = this.page.locator(".Flight_line_spacing__INn4m");
    const prices = await priceElements.allTextContents();
    console.log(`US bangla all Prices: ${prices}`);
    return prices.map(parsePrice);
  }

async selectNovoAirFlight() {
    const checkbox = this.page.locator('[type="checkbox"]').nth(1)
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.uncheck();


    const novoAir = this.page.locator('[type="checkbox"]').nth(0)
    await novoAir.waitFor({ state: 'visible' });
    await novoAir.check()

}

async novoAirFlightPrices() {
  const priceElements = this.page.locator(".Flight_line_spacing__INn4m");
  const prices = await priceElements.allTextContents();
  console.log(`Novo Air All Prices: ${prices}`);
  return prices.map(parsePrice);

}

async compareUSBanglaAndNovoAirPrices(usBanglaPrices: number[], novoAirPrices: number[]) {
  console.log("US Bangla Prices:", usBanglaPrices);
  console.log("Novo Air Prices:", novoAirPrices);

  const hasPriceDifference = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) return true;
    return arr1.some((val, i) => val !== arr2[i]);
  };

  expect(hasPriceDifference(usBanglaPrices, novoAirPrices)).toBeTruthy();
}



}
