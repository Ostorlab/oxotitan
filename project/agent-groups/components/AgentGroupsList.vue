<template>
  <div>
    <DfConfirmationModal
      v-model="deleteAgentGroupDialog"
      title="Are you sure you would like to archive this scan?"
      cancel-button-text="Cancel"
      confirm-button-text="Delete"
      cancel-icon="mdi-close"
      confirm-icon="mdi-check"
      confirm-button-color="secondary"
      card-icon="mdi-archive-arrow-down-outline"
      @confirm="confirmDeleteAgentGroup"
    />
    <v-card
      v-if="showForm === true"
      variant="outlined"
      class="pa-4 mb-4"
    >
      <AgentGroupForm
        :agent-group="selectedAgentGroup"
        :scanner="selectedAgentGroup.scanner"
        :is-edit-mode="true"
        @close-form="onCloseForm"
      />
    </v-card>
    <v-card variant="outlined">
      <v-data-table
        :loading="loading"
        hover
        :headers="headers"
        :items="agentGroups"
        :items-per-page-options="[15, 50, 200, -1]"
        :items-per-page="itemsPerPage"
        density="comfortable"
      >
        <template #[`item.actions`]="{ item }">
          <v-btn
            variant="text"
            size="small"
            :icon="true"
          >
            <v-icon icon="mdi-dots-vertical" />
            <v-menu
              activator="parent"
              location="bottom"
            >
              <v-list
                density="compact"
                class="py-0"
              >
                <template
                  v-for="(action, i) in actions"
                  :key="`item-${action.title}-${i}`"
                >
                  <v-list-item @click="action.action(item)">
                    <v-icon
                      start
                      size="small"
                      :icon="action.icon"
                    />
                    {{ action.title }}
                  </v-list-item>
                  <v-divider v-if="i !== actions.length - 1" />
                </template>
              </v-list>
            </v-menu>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions, mapState } from 'pinia'
import Yaml from 'yaml'
import AgentGroupForm from './AgentGroupForm.vue'
import AgentGroupService from '~/project/agents/services/agentGroup.service'
import { DfConfirmationModal } from '~/dragonfly/components/Modals/DfConfirmationModal'
import type { Scanner } from '~/project/types'

type ActionsType = {
  title?: string
  action: (agentGroup: any) => void
  icon?: string
  disabled?: (agentGroup: any) => boolean
  divider?: boolean
  color: string
}
interface Data {
  loading: boolean
  agentGroupService: AgentGroupService
  agentGroups: any[]
  headers: { title: string, align: string, sortable: boolean, key: string, width: string }[]
  agentGroup: any | null
  itemsPerPage: number
  editorLanguage: string
  editorOptions: object
  deleteAgentGroupDialog: boolean
  onActionAgentGroup: any
  showForm: boolean
  selectedAgentGroup: any | null
}
interface UpdatedAgentGroup {
  description?: string
  id: string
  key?: string
  name?: string
  yamlSource?: string
  scanner: Scanner
}

export default defineComponent({
  components: {
    DfConfirmationModal,
    AgentGroupForm
  },
  data(): Data {
    return {
      loading: true,
      agentGroupService: new AgentGroupService(this.$axios),
      agentGroups: [],
      headers: [
        { title: 'Key', align: 'left', sortable: false, key: 'key', width: '24%' },
        { title: 'Name', align: 'left', sortable: false, key: 'name', width: '14%' },
        { title: 'Description', align: 'left', sortable: false, key: 'description', width: '14%' },
        { title: 'Actions', align: 'left', sortable: false, key: 'actions', width: '5%' }
      ],
      agentGroup: null,
      onActionAgentGroup: null,
      itemsPerPage: 15,
      editorLanguage: 'yaml',
      editorOptions: {
        theme: 'vs',
        wordWrap: 'on',
        wordWrapColumn: 'on',
        fontFamily: 'Fira Code',
        automaticLayout: true,
        minimap: { enabled: false }
      },
      deleteAgentGroupDialog: false,
      showForm: false,
      selectedAgentGroup: null

    }
  },
  computed: {
    ...mapState(useScannersStore, ['scanners']),
    actions(): Array<ActionsType> {
      return [
        {
          title: 'Edit',
          action: (agentGroup) => this.updateAgentGroup(agentGroup),
          icon: 'mdi-pencil-outline',
          color: 'primary',
          divider: true
        },
        {
          title: 'Delete',
          action: (agentGroup) => this.deleteAgentGroup(agentGroup),
          icon: 'mdi-delete',
          color: 'red'
        }
      ]
    }
  },
  mounted() {
    this.fetchAgentGroups()
  },
  methods: {
    ...mapActions(useNotificationsStore, ['reportSuccess', 'reportError']),

    /**
     * Fetches the list of agent groups from the server and updates the component state.
     */
    fetchAgentGroups(): void {
      this.agentGroups = []
      const promises = this.scanners.map((scanner) =>
        this.agentGroupService.getAgentGroups(scanner).then((val) => {
          if (Array.isArray(val)) {
            this.agentGroups.push(...val.map((agentGroup) => ({ ...agentGroup, scanner })))
          }
        })
      )

      Promise.all(promises)
        .then(() => {
          this.loading = false
        })
        .catch((error) => {
          console.error('Error fetching agent groups:', error)
          this.loading = false
        })
    },

    /**
     * Navigates to the route for creating a new agent group.
     */
    navigateToNewAgentGroup(): void {
      const router = useRouter()
      router.push({ path: '/agent-groups/new' })
    },

    /**
     * Parses the YAML source into an array of agents.
     * @param yamlSource - The YAML data to parse.
     * @returns An array of agent objects.
     */
    parseYaml(yamlSource: string): any[] {
      try {
        const data = Yaml.parse(yamlSource) as { agents: any[] }
        return data.agents || []
      } catch (e) {
        console.error('Failed to parse YAML data:', e)
        return []
      }
    },
    /**
     * Opens a confirmation dialog for deleting the specified agent group.
     * @param agentGroup - The agent group to delete.
     */
    deleteAgentGroup(agentGroup: any): void {
      this.onActionAgentGroup = agentGroup
      this.deleteAgentGroupDialog = true
    },

    /**
     * Confirms the deletion of the selected agent group and performs the delete operation.
     */
    async confirmDeleteAgentGroup(): Promise<void> {
      if (!this.onActionAgentGroup) return
      try {
        this.loading = true
        await this.agentGroupService.deleteAgentGroup(this.onActionAgentGroup.scanner, parseInt(this.onActionAgentGroup.id))
        this.reportSuccess('Agent group deleted successfully')
        this.agentGroups = this.agentGroups.filter((agentGroup) => agentGroup.id !== this.onActionAgentGroup.id)
      } catch (e: any) {
        this.reportError(`An error occurred while deleting the agent group: ${e?.message}`)
      } finally {
        this.onActionAgentGroup = null
        this.loading = false
      }
    },

    /**
     * Prepares the form for updating an agent group with the given details.
     * @param agentGroup - The agent group to update.
     */
    updateAgentGroup(agentGroup: UpdatedAgentGroup): void {
      this.selectedAgentGroup = agentGroup
      this.agentGroupService.deleteAgentGroup(agentGroup.scanner, parseInt(agentGroup.id))
      this.showForm = true
    },

    /**
     * Closes the agent group form and refreshes the list of agent groups.
     */
    onCloseForm(): void {
      this.showForm = false
      this.selectedAgentGroup = null
      this.loading = true
      this.fetchAgentGroups()
    }
  }
})
</script>

<style scoped lang="scss">
$border-color: #DADADA;

.tab-header {
  padding: .8rem;
  border-bottom: 1px solid $border-color;
}

.data-table {
  overflow-y: auto;
  height: 100%;
}
</style>
