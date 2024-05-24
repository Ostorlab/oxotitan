<template>
  <v-card variant="outlined">
    <v-stepper-vertical
      v-model="stepNumber"
      color="primary"
      next-text="Continue"
      non-linear
      flat
    >
      <template #default="{ step }">
        <v-stepper-vertical-item
          :complete="step > 1"
          title="Asset"
          value="1"
        >
          <AssetTypeSelector
            id="select_asset"
            v-model:model-value="assetPlatformType"
            :items="assetTypeItems"
            @click="stepNumber++"
          />
          <template #next="{ next }">
            <v-btn
              color="primary"
              variant="elevated"
              @click="next"
            >
              <v-icon start>
                mdi-skip-next-outline
              </v-icon>
              Continue
            </v-btn>
          </template>

          <template #prev />
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          :complete="step > 2"
          subtitle="required"
          title="Target Web APIs"
          value="2"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <template #next="{ next }">
            <v-btn
              color="primary"
              variant="elevated"
              @click="next"
            >
              <v-icon start>
                mdi-skip-next-outline
              </v-icon>
              Continue
            </v-btn>
          </template>

          <template #prev="{ prev }">
            <v-btn
              variant="elevated"
              @click="prev"
            />
          </template>
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          title="Agent Group"
          subtitle="Select or create an agent group to use"
          value="3"
          @click:next="onClickFinish"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit.

          <template #next="{ next }">
            <v-btn
              color="success"
              variant="elevated"
              @click="next"
            >
              <v-icon start>
                mdi-check
              </v-icon>
              Submit
            </v-btn>
          </template>

          <template #prev="{ prev }">
            <v-btn
              v-if="finished === true"
              variant="elevated"
              @click="prev"
            />

            <v-btn
              v-else
              variant="elevated"
              @click="finished = false"
            >
              <v-icon start>
                mdi-cancel
              </v-icon>
              Reset
            </v-btn>
          </template>
        </v-stepper-vertical-item>
      </template>
    </v-stepper-vertical>
  </v-card>
</template>

<script lang="ts">
import { AssetEnum, type Group } from '~/scan/types'
import AssetTypeSelector from '~/scan/components/AssetTypeSelector.vue'

interface Data {
  stepNumber: number
  finished: boolean
  assetTypeItems: Array<Group>
  assetPlatformType: AssetEnum | undefined | null
}

export default defineComponent({
  name: 'CreateScanForm',
  components: { AssetTypeSelector },
  data(): Data {
    return {
      stepNumber: 1,
      finished: false,
      assetPlatformType: AssetEnum.ANDROID_PLAYSTORE,
      assetTypeItems: [
        {
          group: 'Mobile',
          assets: [
            {
              value: AssetEnum.ANDROID_PLAYSTORE,
              title: 'PlayStore',
              description: 'Select an Android App directly from Store ',
              image: '/play-store.png',
              color: 'grey'
            },
            {
              value: AssetEnum.IOS_APPSTORE,
              title: 'AppStore',
              description: 'Select an iOS App directly from Store',
              image: '/apps.png'
            },
            {
              value: AssetEnum.ANDROID_APK,
              title: 'Android App',
              description: 'Scan an Android Application (.APK, .AAB)',
              icon: 'mdi-android',
              color: '#32DE84' // ANDROID GREEN
            },
            {
              value: AssetEnum.IOS_IPA,
              title: 'iOS App',
              description: 'Scan an iOS Application (.IPA)',
              icon: 'mdi-apple',
              color: '#797979'
            }
          ]
        },
        {
          group: 'Web',
          assets: [
            {
              value: AssetEnum.WEB_APP,
              title: 'Web App',
              description: 'Web Application accessible using a browser',
              icon: 'mdi-wan',
              color: 'accent'
            },
            {
              value: AssetEnum.WEB_API,
              title: 'Web API',
              description: 'Web API (REST, SOAP, GraphQL ...)',
              icon: 'mdi-api',
              color: 'accent'
            }
          ]
        },
        {
          group: 'Network',
          assets: [
            {
              value: AssetEnum.NETWORK,
              title: 'Network',
              description: 'Scan IPv4 and IPv6 network ranges',
              icon: 'mdi-ip-network-outline',
              color: 'accent'
            }
          ]
        },
        {
          group: 'YAML',
          assets: [
            {
              value: AssetEnum.YAML,
              title: 'YAML',
              description: 'Provide your assets as YAML input',
              icon: 'mdi-code-json',
              color: 'accent'
            }
          ]
        }
      ]
    }
  }
})
</script>
