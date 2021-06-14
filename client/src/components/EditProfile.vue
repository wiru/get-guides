<template>
  <q-page class="q-pa-md full-width">

		<!-- SAVE CHANGES BUTTON -->
		<div class="flex q-mb-md">
			<q-btn id="guideconfirm" class="col q-pa-xs" @click="editGuide" :loading="loading2" color="primary">
					Save
				<template v-slot:loading>
					Loading...
				</template>
			</q-btn>
		</div>

		<!-- NAME AND PICTURE EDIT -->
		<q-card class="flex row">
			<q-card-section class="flex column justify-around my-card col-8">
				<!-- EDIT NAME HERE -->
				<span class="text-h6">{{ username }}
					<q-icon class="q-px-sm q-pb-xs" name="edit" size="20px" />
				</span>
				<q-popup-edit v-model="username" :validate="val => val.length < 20">
					<template v-slot="{ initialValue, value, emitValue, validate, set, cancel }">
						<q-input
							autofocus
							dense
							:value="username"
							hint="Up to 25 characters"
							:rules="[
								val => validate(value) || 'Less than 25 chars'
							]"
							@input="emitValue"
						>
							<template v-slot:after>
								<q-btn flat dense color="negative" icon="cancel" @click.stop="cancel" />
								<q-btn flat dense color="positive" icon="check_circle" @click.stop="set" :disable="validate(value) === false || initialValue === value" />
							</template>
						</q-input>
					</template>
				</q-popup-edit>
				
					<!-- GUIDE TYPE JUST HARD CODED HERE FOR NOW -->
				<span class="text-subtitle2">Professional Guide
					<q-icon class="q-px-sm q-pb-xs" name="edit" size="20px" />
				</span>
			</q-card-section>

				<!-- PROFILE IMAGE HERE -->
				<q-card-section class="flex justify-center flex-center column col">
					<q-img class="col full-width overflow-hidden rounded-borders" fit="cover" v-bind:src="this.$store.state.guideSelf.avatar">
						<div class="flex flex-center bg-grey" style="height:100%; width:100%; opacity:0.7">
							<q-icon name="photo_camera" size="2rem" class=""></q-icon>
						</div>
					</q-img>
				</q-card-section>

			</q-card>
<!-- 
					<q-select>
						<q-tab label="Places" name="places" />
						<q-icon class="q-px-sm q-pb-xs" name="edit" size="20px" />
					</q-select>

					<q-select>
						<q-tab label="Languages" name="languages" />
						<q-icon class="q-px-sm q-pb-xs" name="edit" size="20px" />
					</q-select> -->

				<!-- PLACES TAB ON Q-CARD -->
				<!-- <q-tab-panels v-model="tab" animated>
					<q-tab-panel name="places">
						<q-chip
							v-for="location in this.$store.state.guideSelf.locations"
							:key="location.fakeValueThatIMadeUp"
							clickable
							square  
							class="bg-primary"
							text-color="white"
						>
							{{ location }}
						</q-chip>
					</q-tab-panel> -->
				<!-- LANGUAGES TAB ON Q-CARD -->
					<!-- <q-tab-panel name="languages">
						<q-chip
							v-for="language in this.$store.state.guideSelf.languages"
							:key="language.fakeValueThatIMadeUp"
							clickable
							square  
							class="bg-primary"
							text-color="white"
						>
							{{ location }}
						</q-chip>
					</q-tab-panel>
				</q-tab-panels> -->

		<q-card class="dropdowns q-pa-md q-ma-md full-width">

			<!-- ALERT -->
			<q-dialog v-model="alert">
				<q-card>
					<q-card-section>
						<div class="text-h6">Alert</div>
					</q-card-section>

					<q-card-section class="q-pt-none">
						Please edit all necessary information.
					</q-card-section>

					<q-card-actions align="right">
						<q-btn flat label="OK" color="primary" v-close-popup />
					</q-card-actions>
				</q-card>
			</q-dialog>

			<!-- AVAILABILITY TITLE -->
			<span class="text-subtitle2">
			Schedule
			</span>			

			<!-- DAYS OF THE WEEK SELECTION -->
			<div class="q-gutter-md q-pa-md">
				<q-select
					class="rounded-borders shadow-2"
					standout
					v-model="availabledaysmodel"
					:options="availabledays"
					label="Edit your availability"
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
						<template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
							<q-item
								
								v-bind="itemProps"
								v-on="itemEvents"
								
							>
							<q-item-section>
									<q-item-label class="text-primary" v-html="opt"></q-item-label>
								</q-item-section>
						
								<q-item-section side>
									<q-toggle							
									:value="selected" color="primary" keep-color @input="toggleOption(opt)" />
								</q-item-section>
							</q-item>
						</template>
					</q-select>
				</div>

			<!-- PLACES -->
			<span class="text-subtitle2">
			Places
			</span>			

			<!-- PLACE SELECTION -->
			<div class="q-gutter-md q-pa-md">
				<q-select
					class="rounded-borders shadow-2"
					standout
					v-model="locationmodel"
					:options="location"
					label="Edit your locations"
					multiple
					hide-selected
					emit-value
					map-options
					transition-show="scale"
					transition-hide="scale"
					bg-color="primary"
					label-color="white"
					text-color="primary"
					dropdown-icon="place"
					> 
						<template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
							<q-item
								
								v-bind="itemProps"
								v-on="itemEvents"
								
							>
							<q-item-section>
									<q-item-label class="text-primary" v-html="opt"></q-item-label>
								</q-item-section>
						
								<q-item-section side>
									<q-toggle							
									:value="selected" color="primary" keep-color @input="toggleOption(opt)" />
								</q-item-section>
							</q-item>
						</template>
					</q-select>
				</div>

			<!-- LANGUAGES -->
			<span class="text-subtitle2">
			Languages
			</span>			

			<!-- LANGUAGES SELECTION -->
			<div class="q-gutter-md q-pa-md">
				<q-select
					class="rounded-borders shadow-2"
					standout
					v-model="languagemodel"
					:options="languages"
					label="Edit your languages"
					multiple
					hide-selected
					emit-value
					map-options
					transition-show="scale"
					transition-hide="scale"
					bg-color="primary"
					label-color="white"
					text-color="primary"
					dropdown-icon="language"
					> 
						<template v-slot:option="{ itemProps, itemEvents, opt, selected, toggleOption }">
							<q-item
								
								v-bind="itemProps"
								v-on="itemEvents"
								
							>
							<q-item-section>
									<q-item-label class="text-primary" v-html="opt"></q-item-label>
								</q-item-section>
						
								<q-item-section side>
									<q-toggle							
									:value="selected" color="primary" keep-color @input="toggleOption(opt)" />
								</q-item-section>
							</q-item>
						</template>
					</q-select>
				</div>


			<span class="text-subtitle2">
			Languages
			</span>	
		<q-scroll-area
      horizontal
      style="height:80px"
      class="q-pa-sm rounded-borders"
    >
      <div class="row no-wrap">
        <q-btn
					label="About me"
					class="q-mx-sm bg-primary text-white"
					name="add text"
					@click="aboutMe = true"
				>
				</q-btn>
			<!-- SPECIALTIES -->
        <q-btn
					label="Specialties"
					class="q-mx-sm bg-primary text-white"
					name="add text"
					@click="specialties = true"
				>
				</q-btn>
			<!-- HOBBIES -->
        <q-btn
					label="Hobbies"
					class="q-mx-sm bg-primary text-white"
					name="add text"
					@click="hobbies = true"
				>
				</q-btn>
      </div>
    </q-scroll-area>
	</q-card>

		<!-- ABOUT ME UPDATE DIALOG -->
		<q-dialog v-model="aboutMe">
      <q-card class="my-card full-width">
        <q-img height="200px" src="../assets/thinking2.jpg" />

        <q-card-section>

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Tell travellers about yourself
            </div>
          </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
         	<q-input
						type="textarea"
						v-model="biomodel"
						autofocus
						counter
						@keyup.enter.stop
					/>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Set" />
          <q-btn v-close-popup flat color="primary" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>

		<!-- SPECIALTIES UPDATE DIALOG -->
		<q-dialog v-model="specialties">
      <q-card class="my-card full-width">
				<q-img height="200px" src="../assets/tokyo1.jpg" />

        <q-card-section>

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Do you have any knowledgable areas?
            </div>
          </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
         	<q-input
						type="textarea"
						v-model="biomodel"
						autofocus
						counter
						@keyup.enter.stop
					/>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Set" />
          <q-btn v-close-popup flat color="primary" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>

		<!-- HOBBIES UPDATE DIALOG -->
		<q-dialog v-model="hobbies">
      <q-card class="my-card full-width">
        <q-img height="200px" src="../assets/photography2.jpg" />

        <q-card-section>

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              What do you do in your free time?
            </div>
          </div>

        </q-card-section>

        <q-card-section class="q-pt-none">
         	<q-input
						type="textarea"
						v-model="biomodel"
						autofocus
						counter
						@keyup.enter.stop
					/>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="Set" />
          <q-btn v-close-popup flat color="primary" label="Cancel" />
        </q-card-actions>
      </q-card>
    </q-dialog>


    </q-page>
</template>

<script>
import { date } from "quasar";

export default {
    name: 'EditProfile',
		methods: {
        editGuide () {
            console.log(this.usermodel, this.username, this.locationmodel, this.languagemodel, this.availabledaysmodel, this.ratemodel, this.biomodel)
            if (this.usermodel !== null && this.username !== "" && this.locationmodel !== null && this.languagemodel !== null && this.availabledaysmodel !== null && this.ratemodel !== null && this.biomodel !== null) {
            
            let guidePackageUpdate = {}
            guidePackageUpdate["usertype"] = this.usermodel
            guidePackageUpdate["username"] = this.username
            //guidePackageUpdate["email"] = this.emailaddress
            guidePackageUpdate["location"] = this.locationmodel
            guidePackageUpdate["language"] = this.languagemodel
            guidePackageUpdate["availabledays"] = this.availabledaysmodel
            guidePackageUpdate["rate"] = this.ratemodel
            guidePackageUpdate["bio"] = this.biomodel
            //guidePackageUpdate["gid"] = this.$store.state.gid
            guidePackageUpdate["id"] =this.$store.state.id

            //console.log(guidePackageUpdate)
            
            this.$store.commit("setGuidePackageUpdate", guidePackageUpdate)
            this.$store.dispatch('guidePackageUpdate', guidePackageUpdate)
            
            const inefficientPayload = {
            id: this.$store.state.id,
            nextPage: "My Profile"
            }
            this.$store.dispatch("getUser", inefficientPayload)
            }
            
            else {this.alert = true}
        }
    },
    data () {
        return {
            usermodel: "guide",
            locationmodel: this.$store.state.guideSelf.locations,
            languagemodel: this.$store.state.guideSelf.languages,
            availabledaysmodel: this.$store.state.guideSelf.weekdays,
            ratemodel: this.$store.state.guideSelf.rate,
            biomodel: this.$store.state.guideSelf.bio,
            usertype: ['traveller', 'guide'],
            location: ['nikko', 'tokyo', 'osaka', 'hiroshima', 'sapporo', 'fukuoka', 'ehime', 'kyoto', 'nagoya'],
            languages: ['english', 'japanese', 'italian', 'german', 'spanish', 'chinese', 'korean', 'french', 'thai', 'indian'],
            // availabledays: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
            username: this.$store.state.guideSelf.name,
            //emailaddress: this.$store.state.email,
            dense: true,
            alert: false,
						model: [],
						availabledays: [
							'Monday',
							'Tuesday',
							'Wednesday',
							'Thursday',
							'Friday',
							'Saturday',
							'Sunday',
						],
						loading2: false,
						aboutMe: false,
						specialties: false,
						hobbies: false
				}
    }
}
</script>


<style>
.dropdowns .q-icon, .material-icons-round, .material-icons-sharp {
	color: white!important;
	
}
</style>