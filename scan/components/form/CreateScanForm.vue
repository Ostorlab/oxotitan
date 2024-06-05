<template>
  <v-card variant="outlined">
    <v-stepper-vertical
      v-model.number="stepNumber"
      color="primary"
      next-text="Continue"
      non-linear
      flat
    >
      <template #default="{ step }">
        <v-stepper-vertical-item
          :complete="step > 1"
          title="Scanner"
          subtitle="Select or create a scanner to run the scan on"
          :value="1"
        >
          <ScannerSelect v-model:model-value="selectedScanner" />
          <template #next="{ next }">
            <v-btn
              color="primary"
              variant="elevated"
              :disabled="selectedScanner === null"
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
          title="Title"
          subtitle="Optional"
          :value="2"
        >
          <v-text-field
            v-model="scanTitle"
            variant="outlined"
            density="compact"
            clearable
            hide-details
            label="Scan Title (Otpional)"
            placeholder="Enter a scan title to easily identify your scan"
            prepend-icon="mdi-format-tile"
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
          :complete="step > 3"
          title="Asset"
          :value="3"
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
              :disabled="isStepValid === false"
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
        <component
          :is="scanTargetForm"
          v-model:scan-target-step-title="scanTargetStepTitle"
          v-model:scan-target-step-subtitle="scanTargetStepSubtitle"
          v-model:is-step-valid="isStepValid"
          v-model:assets="assets"
          v-model:agent-group-id="agentGroupId"
          ::create-scan-loading="createScanLoading"
          :selected-scanner="selectedScanner"
          :asset-type="assetType"
          :step="4"
          :asset-platform-type="assetPlatformType"
          @reset="resetForm"
          @create-scan="createScan"
        />
      </template>
    </v-stepper-vertical>
  </v-card>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import type { Scanner } from '~/project/types'
import { AssetEnum, type Group } from '~/scan/types'
import AssetTypeSelector from '~/scan/components/AssetTypeSelector.vue'
import CreateMobileScanStoreForm from '~/scan/components/form/CreateMobileScanStoreForm.vue'
import CreateWebScanForm from '~/scan/components/form/CreateWebScanForm.vue'
import CreateWebApiScanForm from '~/scan/components/form/CreateWebApiScanForm.vue'
import CreateNetworkScanForm from '~/scan/components/form/CreateNetworkScanForm.vue'
import CreateMobileScanFileForm from '~/scan/components/form/CreateMobileScanFileForm.vue'
import CreateScanYamlForm from '~/scan/components/form/CreateScanYamlForm.vue'
import ScannerSelect from '~/scan/components/ScannerSelect.vue'
import AssetsService from '~/project/assets/services/assets.service'
import { useNotificationsStore } from '~/stores/notifications'

interface Data {
  isStepValid: boolean
  stepNumber: number
  finished: boolean
  scanTitle: string | null
  assetTypeItems: Array<Group>
  assetPlatformType: AssetEnum | undefined | null
  scanTargetStepTitle: string | null
  scanTargetStepSubtitle: string | null
  selectedScanner: Scanner | null
  assets: unknown
  agentGroupId: number | null
  createScanLoading: boolean
  assetsService: AssetsService
}

export default defineComponent({
  name: 'CreateScanForm',
  components: {
    AssetTypeSelector,
    CreateMobileScanStoreForm,
    CreateWebScanForm,
    CreateWebApiScanForm,
    CreateNetworkScanForm,
    CreateScanYamlForm,
    ScannerSelect
  },
  data(): Data {
    return {
      assetsService: new AssetsService(this.$axios),
      createScanLoading: false,
      agentGroupId: null,
      assets: null,
      scanTitle: null,
      selectedScanner: null,
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
        case AssetEnum.ANDROID_APK:
        case AssetEnum.IOS_IPA:
          return CreateMobileScanFileForm
        case AssetEnum.ANDROID_PLAYSTORE:
        case AssetEnum.IOS_APPSTORE:
          return CreateMobileScanStoreForm
        case AssetEnum.WEB_APP:
          return CreateWebScanForm
        case AssetEnum.WEB_API:
          return CreateWebApiScanForm
        case AssetEnum.NETWORK:
          return CreateNetworkScanForm
        case AssetEnum.YAML:
          return CreateScanYamlForm
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
  },
  watch: {
    assetPlatformType() {
      this.assets = []
    }
  },
  methods: {
    ...mapActions(useNotificationsStore, ['reportError']),
    /**
     * Create scan.
     */
    async createScan(): Promise<void> {
      await this.createAssets()
    },
    /**
     * Create assets.
     */
    async createAssets(): Promise<void> {
      if (this.selectedScanner === null) {
        this.reportError('No scanner selected')
        return
      }
      if (this.assets === null) {
        this.reportError('No assets were added')
        return
      }
      try {
        this.assetsService.createAssets(this.selectedScanner, this.assets)
      } catch (e: any) {
        this.reportError(e?.message || 'Error creating assets')
      }
    },
    /**
     * Reset the form.
     */
    resetForm(): void {
      this.stepNumber = 1
      this.assets = []
    }
  }
})
</script>
