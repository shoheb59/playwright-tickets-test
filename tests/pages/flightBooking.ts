import { BasePage } from "./basePage";

export class FlightBookingPage extends BasePage {
    
    private readonly url = 'https://www.shohoz.com/air-tickets';

    async navigate() {
        await this.page.goto(this.url);
    }
    async selectLeavingFrom() {

        await this.page.getByRole('button', { name: 'Allow', exact: true }).click();
        await this.page.locator('#one-tab-pane').getByText('Dhaka', { exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Leaving From' }).fill('chattogram');
        await this.page.getByText('CGP, Chattogram, Bangladesh').click();
  
        
    }
    async selectArrivalTo() {
        await this.page.locator('#one-tab-pane').getByText('Cox\'s Bazar', { exact: true }).click();
        await this.page.getByRole('textbox', { name: 'Arrival To' }).fill('Dhaka');
        await this.page.locator('#one-tab-pane').getByText('DAC, Dhaka, Bangladesh').nth(1).click();
   
    }
    async selectDepartureDate(date) {
        await this.page.getByRole('textbox').click();
        for (let i = 0; i < 3; i++) {
            await this.page.getByRole('button', { name: 'Next Month' }).click();
        }
        await this.page.getByRole('option', { name: `Choose ${date}` }).click();
    }
    async selectTravelerAndClass(travelers, classType) {
        await this.page.getByRole('button', { name: 'Traveler, Class 1 Traveler(s' }).click();
        for (let i = 0; i < travelers - 1; i++) {
            await this.page.getByRole('button', { name: '+' }).first().click();
        }
        await this.page.getByRole('button', { name: classType }).click();
        await this.page.getByRole('button', { name: 'Done' }).click();
    }
    async searchFlights() {
        await this.page.getByRole('button', { name: 'Search' }).click();
    }
   

}