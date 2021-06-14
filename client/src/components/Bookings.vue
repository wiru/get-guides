<template>
  <div id="bookings" class="full-width" style="min-height: inherit"> 
    <q-img src="../assets/fuji.jpg" class="" style="height: 150px">

    </q-img>
    <div class="q-pa-md">
        
        <q-card rounded>
        <q-card-section class="text-subtitle1 bg-primary text-white">
          Your current bookings
        </q-card-section>
        <q-card-section 
          class="q-pa-none q-ma-none bg-white"
          :key="booking.id"
          v-for="booking in this.$store.state.bookings"
          > 
          <q-card-section class="q-pa-none q-ma-sm">
          <q-expansion-item class="" v-bind:label="booking.date">
            <q-card>
              <q-card-section>
              <q-card-section class="text-subtitle1">
                <q-icon 
                class="q-pb-xs q-pr-xs"
                size="sm"
                color="primary"
                name="today"/>
                {{ booking.date }}
              </q-card-section>
              <q-card-section class="text-subtitle1">
                <q-icon class="q-pb-xs q-pr-xs"
                size="sm"
                color="primary"
                name="location_city"/> 
                {{ booking.location }}
              </q-card-section>
              <q-card-section class="text-subtitle1">
                <q-icon 
                class="q-pb-xs q-pr-xs"
                size="sm"
                color="primary"
                name="push_pin"/> 
                {{ booking.meeting_location }}
              </q-card-section>
              <q-card-section class="text-subtitle1">
                <q-icon 
                class="q-pb-xs q-pr-xs"
                size="sm"
                color="primary" 
                name="schedule"/> 
                {{ booking.start_time }}
              </q-card-section>
              <q-card-section class="text-subtitle1">
                <q-icon 
                class="q-pb-xs q-pr-xs"
                size="sm"
                color="primary"
                name="schedule"/> 
                {{ booking.end_time }}
              </q-card-section>
              <q-card-section class="text-subtitle1">
                <q-icon 
                class="q-pb-xs q-pr-xs"
                size="sm"
                color="primary"
                name="info"/> 
                {{ booking.details }}
              </q-card-section>
              <q-btn
                v-if="booking.type === 'paid'"
                id="pay"
                color="deep-orange"
                icon="credit_card"
                @click="checkout(booking.price, booking.currency)"
              />
            </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-card-section>
          <q-card-section class="q-pa-none q-ma-none">
            <q-separator color="grey-4" /> 
          </q-card-section>
        </q-card-section>
        </q-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import serverLink from "../serverLink";
import { loadStripe } from "@stripe/stripe-js";
const stripeInit = loadStripe(
  "pk_test_51IyBaBBjEZPN4gtmG1jLAzZM4yRbvITQHdOApeVCIPXTMianEW5DbRWKMcVPbCxbujQgKIeW0IUytxeUfGlWlRKM00kAUTP5sO"
);
export default {
  name: "Bookings",
  methods: {
    async checkout(price, currency) {
      let payload = {
        amount: price,
        currency: currency
      };
      console.log("payload @ component: ", payload);
      const sessionId = (
        await axios.post(`${serverLink}/api/checkout-session`, payload)
      ).data;

      console.log(sessionId);
      stripeInit.then(stripe => {
        stripe.redirectToCheckout({
          sessionId: sessionId
        });
      });
      // this.sessionId = response.data.id;
      // this.$refs.checkoutRef.redirectToCheckout();
    }
  },
};

/*

<q-list bordered>
        <q-item v-ripple>
          <q-item-section>Pending bookings</q-item-section>
        </q-item>

        <q-expansion-item
          :key="booking.id"
          v-for="booking in this.$store.state.bookings"
          label="I can't name this dynamically"
        >
          <q-card>
            <q-card-section>
              <q-card-section>{{ booking.date }}</q-card-section>
              <q-card-section>{{ booking.location }}</q-card-section>
              <q-card-section>{{ booking.meeting_location }}</q-card-section>
              <q-card-section>{{ booking.start_time }}</q-card-section>
              <q-card-section>{{ booking.end_time }}</q-card-section>
              <q-card-section>{{ booking.details }}</q-card-section>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>

*/
</script>

<style scoped></style>