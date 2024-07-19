<template>
  <v-card variant="outlined">
    <v-stepper-vertical
      v-model.number="stepNumber"
      color="primary"
      next-text="Continue"
      non-linear
      flat
      editable
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
            prepend-icon="mdi-format-title"
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
              <v-icon start>
                mdi-skip-previous-outline
              </v-icon>
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
              <v-icon start>
                mdi-skip-previous-outline
              </v-icon>
              Previous
            </v-btn>
          </template>
        </v-stepper-vertical-item>
        <keep-alive>
          <component
            :is="scanTargetForm"
            v-model:scan-target-step-title="scanTargetStepTitle"
            v-model:scan-target-step-subtitle="scanTargetStepSubtitle"
            v-model:is-step-valid="isStepValid"
            v-model:assets="assets"
            v-model:agent-group-id="agentGroupId"
            :create-scan-loading="createScanLoading"
            :selected-scanner="selectedScanner"
            :asset-type="assetType"
            :step="4"
            :asset-platform-type="assetPlatformType"
            @reset="resetForm"
            @create-scan="createScan"
          />
        </keep-alive>
      </template>
    </v-stepper-vertical>
  </v-card>
</template>

<script lang="ts">
import { mapActions } from 'pinia'
import { AssetEnum, type Group, type Scanner } from '~/project/types'
import AssetTypeSelector from '~/project/scans/components/AssetTypeSelector.vue'
import CreateMobileScanStoreForm from '~/project/scans/components/form/CreateMobileScanStoreForm.vue'
import CreateWebScanForm from '~/project/scans/components/form/CreateWebScanForm.vue'
import CreateWebApiScanForm from '~/project/scans/components/form/CreateWebApiScanForm.vue'
import CreateNetworkScanForm from '~/project/scans/components/form/CreateNetworkScanForm.vue'
import CreateMobileScanFileForm from '~/project/scans/components/form/CreateMobileScanFileForm.vue'
import CreateScanYamlForm from '~/project/scans/components/form/CreateScanYamlForm.vue'
import ScannerSelect from '~/project/scanners/components/ScannerSelect.vue'
import AssetsService from '~/project/assets/services/assets.service'
import ScansService from '~/project/scans/services/ScanService'
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
  scansService: ScansService
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
      scansService: new ScansService(this.$axios),
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
      assetPlatformType: AssetEnum.WEB_APP,
      assetTypeItems: [
        {
          group: 'Web/Network',
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
            },
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
    ...mapActions(useNotificationsStore, ['reportError', 'reportSuccess']),
    /**
     * Create scan.
     */
    async createScan(): Promise<undefined> {
      if (this.selectedScanner === null || this.agentGroupId === null) {
        this.reportError('No scanner selected')
        return
      }
      try {
        this.createScanLoading = true
        const assets = await this.createAssets() || []

        if (assets.length === 0) {
          throw new Error('Failed to create assets')
        }

        await this.scansService.runScan(
          this.selectedScanner,
          {
            title: this.scanTitle || undefined,
            agentGroupId: this.agentGroupId,
            assetIds: assets.map((asset) => parseInt(asset.id))
          }
        )
        this.reportSuccess('Scan created successfully')
        this.resetForm()
      } catch (e: any) {
        this.reportError(e?.message || 'An error occured while creating the scan')
      } finally {
        this.createScanLoading = false
      }
    },
    /**
     * Create assets.
     */
    async createAssets(): Promise<Array<{ id: string }>> {
      if (this.selectedScanner === null) {
        throw new Error('No scanner selected')
      }
      if (this.assets === null) {
        throw new Error('No assets were added')
      }
      try {
        return await this.assetsService.createAssets(this.selectedScanner, this.assets)
      } catch (e: any) {
        throw new Error(e?.message || 'Error creating assets')
      }
    },
    /**
     * Reset the form.
     */
    resetForm(): void {
      this.stepNumber = 1
      this.assets = []
      this.agentGroupId = null
      this.selectedScanner = null
      this.scanTitle = null
      this.assetPlatformType = AssetEnum.WEB_APP
    }
  }
})
</script>
