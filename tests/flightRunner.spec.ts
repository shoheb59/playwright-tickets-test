import { test, expect } from '@playwright/test';
import { FlightBookingPage } from './pages/flightBooking';
import { FlightSelectPage } from './pages/flightSelect';

test('Flight booking test', async ({ page }) => {
const flightBookingPage = new FlightBookingPage(page);
const flightSelectPage = new FlightSelectPage(page);
await page.goto('https://www.shohoz.com/air-tickets');
  
  await flightBookingPage.selectLeavingFrom();
  await flightBookingPage.selectArrivalTo();
  await flightBookingPage.selectDepartureDate('Tuesday, September 23rd,');
  await flightBookingPage.selectTravelerAndClass(2, 'Premium Economy');
  await flightBookingPage.searchFlights();


  
  await flightSelectPage.selectUSBanglaFlight();
  const priceText = await flightSelectPage.selectUSBanglaFlight();
  await flightSelectPage.selectBookingFlight();
  await flightSelectPage.verifyReviewFareModalAppear();
  await flightSelectPage.verifyFareAmount(priceText);
  await flightSelectPage.continueToBooking();
  await flightSelectPage.closeSignInModal();

  const usBanglaPrices = await flightSelectPage.allPriceforUSBanglaFlight();
  await flightSelectPage.selectNovoAirFlight();

  const novoAirPrices = await flightSelectPage.novoAirFlightPrices();

  await flightSelectPage.compareUSBanglaAndNovoAirPrices(usBanglaPrices, novoAirPrices);

});