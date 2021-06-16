<template>
  <div
    class="flex row full-width"
    id="registragion"
    style="min-height: inherit"
  >
    <q-img src="../assets/welcome1.jpg" style="height: 150px"> </q-img>
    <div class="flex column col q-pa-md">
      <q-card>
        <q-card-section class="bg-primary">
          <div class="text-h5 text-white">
            New user registration
          </div>
        </q-card-section>

        <q-card-section>
          <span class="text-teal-9 text-subtitle2">
            Please fill in the following fields to finish the registration
            process.
          </span>

          <q-select
            class="q-my-md"
            disable
            filled
            v-model="username"
            :username="username"
          />
          <q-select
            class="q-mb-md"
            disable
            filled
            v-model="emailaddress"
            :emailaddress="emailaddress"
          />
          <q-dialog v-model="alert">
            <q-card>
              <q-card-section>
                <div class="text-h6">Alert</div>
              </q-card-section>

              <q-card-section class="text-teal-9 q-pt-none">
                Please fill in all necessary information.
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <span class="text-teal-9 text-subtitle2"
            >Please confirm the type of account you would like to create:</span
          >

          <q-select
            class="q-mt-md rounded-borders shadow-2"
            standout
            v-model="usermodel"
            :options="usertype"
            label="Account Type"
            emit-value
            map-options
            hide-selected
            transition-show="scale"
            transition-hide="scale"
            bg-color="primary"
            label-color="white"
            dropdown-icon="person_add"
            text-color="primary"
          >
          </q-select>

          <!-- <q-select class="q-my-md" outlined v-model="usermodel" :options="usertype" label="Account Type" :dense="dense" /> -->
          <div id="travelreg" v-if="usermodel === 'Traveller'">
            <br />
            <span class="text-teal-9 text-subtitle2"
              >You're all set! Please confirm to finish the registration.</span
            >
            <br />
            <q-btn
              class="q-pa-xs q-my-md full-width"
              id="travelconfirm"
              @click="registerTraveller"
              color="primary"
              label="Finish"
            />
          </div>
          <div id="guidereg" v-if="usermodel === 'Guide'">
            <br />
            <q-input
              filled
              v-model="biomodel"
              type="string"
              maxlength="160"
              placeholder="Please write a short bio about yourself!"
              hint="max 160 characters"
              :dense="dense"
            />
            <br />

            <q-select
              class="rounded-borders shadow-2"
              standout
              v-model="locationmodel"
              :options="location"
              label="Locations"
              multiple
              hide-selected
              emit-value
              map-options
              transition-show="scale"
              transition-hide="scale"
              bg-color="primary"
              label-color="white"
              dropdown-icon="place"
              text-color="primary"
            >
              <template
                v-slot:option="{
                  itemProps,
                  itemEvents,
                  opt,
                  selected,
                  toggleOption
                }"
              >
                <q-item v-bind="itemProps" v-on="itemEvents">
                  <q-item-section>
                    <q-item-label
                      class="text-primary"
                      v-html="opt"
                    ></q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-toggle
                      :value="selected"
                      color="primary"
                      keep-color
                      @input="toggleOption(opt)"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <!-- <q-select filled v-model="locationmodel" multiple :options="location" label="Location" hint="Multiple Options" :dense="dense" /> -->

            <br />
            <q-select
              class="rounded-borders shadow-2"
              standout
              v-model="languagemodel"
              :options="languages"
              label="Languages"
              multiple
              hide-selected
              emit-value
              map-options
              transition-show="scale"
              transition-hide="scale"
              bg-color="primary"
              label-color="white"
              dropdown-icon="language"
              text-color="primary"
            >
              <template
                v-slot:option="{
                  itemProps,
                  itemEvents,
                  opt,
                  selected,
                  toggleOption
                }"
              >
                <q-item v-bind="itemProps" v-on="itemEvents">
                  <q-item-section>
                    <q-item-label
                      class="text-primary"
                      v-html="opt"
                    ></q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-toggle
                      :value="selected"
                      color="primary"
                      keep-color
                      @input="toggleOption(opt)"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>

            <!-- <q-select filled v-model="languagemodel" multiple :options="languages" label="Languages"  hint="Multiple Options" :dense="dense" />
                 -->
            <br />
            <q-select
              class="rounded-borders shadow-2"
              standout
              v-model="availabledaysmodel"
              :options="availabledays"
              label="Availability"
              multiple
              hide-selected
              emit-value
              map-options
              transition-show="scale"
              transition-hide="scale"
              bg-color="primary"
              label-color="white"
              dropdown-icon="event"
              text-color="primary"
            >
              <template
                v-slot:option="{
                  itemProps,
                  itemEvents,
                  opt,
                  selected,
                  toggleOption
                }"
              >
                <q-item v-bind="itemProps" v-on="itemEvents">
                  <q-item-section>
                    <q-item-label
                      class="text-primary"
                      v-html="opt"
                    ></q-item-label>
                  </q-item-section>

                  <q-item-section side>
                    <q-toggle
                      :value="selected"
                      color="primary"
                      keep-color
                      @input="toggleOption(opt)"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <!-- <q-select filled v-model="availabledaysmodel" multiple :options="availabledays" label="Available Days"  hint="Multiple Options" /> -->
            <br />
            <q-input
              filled
              v-model="ratemodel"
              type="number"
              placeholder="Approx. Rate"
              hint="in JPY, per hour"
              :dense="dense"
            />
            <br />
            <span class="text-teal-9 text-subtitle2"
              >You're all set! Please confirm to finish the registration.</span
            >
            <br />
            <q-btn
              class="q-ma-md q-py-xs full-width"
              id="guideconfirm"
              @click="registerGuide"
              color="primary"
              label="Finish"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Registration",
  methods: {
    registerTraveller() {
      if (
        this.usermodel !== null &&
        this.username !== "" &&
        this.emailaddress !== "" &&
        this.$store.state.gid !== ""
      ) {
        let travellerPackage = {};
        travellerPackage["usertype"] = this.usermodel;
        travellerPackage["username"] = this.username;
        travellerPackage["email"] = this.emailaddress;
        travellerPackage["gid"] = this.$store.state.gid;
        //console.log(travellerPackage)
        this.$store.commit("setTravellerPackage", travellerPackage);
        this.$store.dispatch("travellerPackage", travellerPackage);
      } else {
        this.alert = true;
      }
    },
    registerGuide() {
      if (
        this.usermodel !== null &&
        this.username !== "" &&
        this.emailaddress !== "" &&
        this.locationmodel !== null &&
        this.languagemodel !== null &&
        this.availabledaysmodel !== null &&
        this.ratemodel !== null &&
        this.biomodel !== null &&
        this.$store.state.gid !== ""
      ) {
        let guidePackage = {};
        guidePackage["usertype"] = this.usermodel.toLowerCase();
        guidePackage["username"] = this.username;
        guidePackage["email"] = this.emailaddress;
        guidePackage["location"] = this.locationmodel.map(location =>
          location.toLowerCase()
        );
        guidePackage["language"] = this.languagemodel.map(language =>
          language.toLowerCase()
        );
        guidePackage["availabledays"] = this.availabledaysmodel;
        guidePackage["rate"] = this.ratemodel;
        guidePackage["bio"] = this.biomodel;
        guidePackage["gid"] = this.$store.state.gid;
        guidePackage["unavailable_dates"] = [];
        //console.log(guidePackage)
        this.$store.commit("setGuidePackage", guidePackage);
        this.$store.dispatch("guidePackage", guidePackage);
      } else {
        this.alert = true;
      }
    }
  },
  mounted() {},
  data() {
    return {
      usermodel: null,
      locationmodel: null,
      languagemodel: null,
      availabledaysmodel: null,
      ratemodel: null,
      biomodel: null,
      usertype: ["Traveller", "Guide"],
      location: [
        "Nikko",
        "Tokyo",
        "Osaka",
        "Hiroshima",
        "Sapporo",
        "Fukuoka",
        "Ehime",
        "Kyoto",
        "Nagoya"
      ],
      languages: [
        "English",
        "Japanese",
        "Italian",
        "German",
        "Spanish",
        "Chinese",
        "Korean",
        "French",
        "Thai",
        "Indian"
      ],
      availabledays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      username: this.$store.state.name,
      emailaddress: this.$store.state.email,
      dense: true,
      alert: false
    };
  }
};
</script>

<style>
.q-select__dropdown-icon {
  color: white !important;
}
/* .q-field__native {
    color: white;
} */
</style>
