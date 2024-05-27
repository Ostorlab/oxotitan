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
          :title="scanTargetStepTitle"
          :subtitle="scanTargetStepSubtitle"
          value="2"
          :error="isStepValid === false && step > 2"
        >
          <component
            :is="scanTargetForm"
            v-model:scan-target-step-title="scanTargetStepTitle"
            v-model:scan-target-step-subtitle="scanTargetStepSubtitle"
            v-model:is-step-valid="isStepValid"
            :asset-type="assetType"
            :asset-platform-type="assetPlatformType"
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

          <template #prev="{ prev }">
            <v-btn
              variant="elevated"
              @click="prev"
            >
              Previous
            </v-btn>
          </template>
        </v-stepper-vertical-item>

        <v-stepper-vertical-item
          title="Agent Group"
          subtitle="Select or create an agent group to use"
          value="3"
          @click:next="null"
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
              @click="finished = false; stepNumber = 1"
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
import CreateMobileScanStoreForm from '~/scan/components/form/CreateMobileScanStoreForm.vue'
import CreateWebScanForm from '~/scan/components/form/CreateWebScanForm.vue'
import CreateWebApiScanForm from '~/scan/components/form/CreateWebApiScanForm.vue'
import CreateNetworkScanForm from '~/scan/components/form/CreateNetworkScanForm.vue'

interface Data {
  isStepValid: boolean
  stepNumber: number
  finished: boolean
  assetTypeItems: Array<Group>
  assetPlatformType: AssetEnum | undefined | null
  scanTargetStepTitle: string | null
  scanTargetStepSubtitle: string | null
}

export default defineComponent({
  name: 'CreateScanForm',
  components: {
    AssetTypeSelector,
    CreateMobileScanStoreForm,
    CreateWebScanForm,
    CreateWebApiScanForm,
    CreateNetworkScanForm
  },
  data(): Data {
    return {
      scanTargetStepTitle: null,
      scanTargetStepSubtitle: null,
      isStepValid: true,
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
  },
  computed: {
    /**
     * The input form to show based on the asset type.
     */
    scanTargetForm(): ReturnType<typeof defineComponent> {
      switch (this.assetPlatformType) {
        case AssetEnum.ANDROID_PLAYSTORE:
        case AssetEnum.IOS_APPSTORE:
          return CreateMobileScanStoreForm
        case AssetEnum.WEB_APP:
          return CreateWebScanForm
        case AssetEnum.WEB_API:
          return CreateWebApiScanForm
        case AssetEnum.NETWORK:
          return CreateNetworkScanForm
        default:
          return null
      }
    },
    /**
     * The selected asset type.
     */
    assetType(): AssetEnum | string | null {
      switch (this.assetPlatformType) {
        case AssetEnum.ANDROID_APK:
        case AssetEnum.ANDROID_PLAYSTORE:
          return 'android'
        case AssetEnum.IOS_IPA:
        case AssetEnum.IOS_APPSTORE:
          return 'ios'
        case AssetEnum.WEB_API:
          return AssetEnum.WEB_API
        case AssetEnum.WEB_APP:
          return AssetEnum.WEB_APP
        case AssetEnum.NETWORK:
          return AssetEnum.NETWORK
        default:
          return null
      }
    }
  }
})
</script>
