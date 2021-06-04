<template>
  <div id="bookings">
    <div class="q-pa-md" style="width: 100vw">
      <q-list bordered>
        <q-item v-ripple>
          <q-item-section>Confirmed bookings</q-item-section>
        </q-item>

        <q-expansion-item
          :key="booking.id"
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
export default {
  name: "Bookings",
  methods: {},
  created() {
    this.$store.dispatch("getBookings");
  }
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
