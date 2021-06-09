<template>
  <div id="bookings">
    <div class="q-pa-md" style="width: 100vw">
      <q-list bordered>
        <q-item v-ripple>
          <q-item-section>Confirmed bookings</q-item-section>
        </q-item>

        <q-expansion-item
          :key="booking._id"
          v-for="booking in this.$store.state.bookings"
          v-bind:label="booking.date"
        >
          <q-card>
            <q-card-section>
              <q-card-section>{{ booking.date }}</q-card-section>
              <q-card-section>{{ booking.location }}</q-card-section>
              <q-card-section>{{ booking.meeting_location }}</q-card-section>
              <q-card-section>{{ booking.start_time }}</q-card-section>
              <q-card-section>{{ booking.end_time }}</q-card-section>
              <q-card-section>{{ booking.details }}</q-card-section>
              <q-card-section>{{ booking.price }}</q-card-section>
              <q-card-section>{{ booking.currency }}</q-card-section>
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
      </q-list>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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