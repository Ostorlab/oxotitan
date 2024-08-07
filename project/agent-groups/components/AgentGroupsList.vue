<template>
  <div>
    <DfConfirmationModal
      v-model="deleteAgentGroupDialog"
      title="Are you sure you would like to delete this Agent group?"
      cancel-button-text="Cancel"
      confirm-button-text="Delete"
      cancel-icon="mdi-close"
      confirm-icon="mdi-check"
      confirm-button-color="secondary"
      card-icon="mdi-delete-outline"
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
        <template #[`item.agents`]="{ item }">
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="chip-container">
                  <v-chip
                    v-for="(agent, index) in visibleAgents(item.yamlSource)"
                    :key="index"
                    class="mr-1"
                  >
                    {{ formatAgentKey(agent.key) }}
                  </v-chip>
                  <v-chip
                    v-if="remainingCount(item.yamlSource) > 0"
                    class="mr-1"
                    color="grey lighten-2"
                    text-color="black"
                    style="min-width: 50px; padding: 0 12px;"
                  >
                    +{{ remainingCount(item.yamlSource) }}
                  </v-chip>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
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
  action?: (agentGroup: any) => void
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
  expandedItem: string | null
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
        { title: 'Key', align: 'left', sortable: false, key: 'key', width: '10%' },
        { title: 'Description', align: 'left', sortable: false, key: 'description', width: '14%' },
        { title: 'Agents', align: 'left', sortable: false, key: 'agents', width: '20%' },
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
      selectedAgentGroup: null,
      expandedItem: null
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
    async fetchAgentGroups(): Promise<void> {
      this.agentGroups = []
      this.loading = true

      try {
        const promises = this.scanners.map(async (scanner) => {
          try {
            const val = await this.agentGroupService.getAgentGroups(scanner)
            if (Array.isArray(val)) {
              this.agentGroups.push(...val.map((agentGroup) => ({ ...agentGroup, scanner })))
            }
          } catch (error) {
            this.reportError(error?.message || 'Error fetching agent groups')
          }
        })

        await Promise.allSettled(promises)
      } finally {
        this.loading = false
      }
    },
    parseYaml(yamlSource: string): any[] {
      try {
        const data = Yaml.parse(yamlSource) as { agents: any[] }
        return data.agents || []
      } catch (e) {
        return []
      }
    },
    visibleAgents(yamlSource: string): any[] {
      const agents = this.parseYaml(yamlSource)
      return agents.slice(0, 4) // Show only the first 4 agents
    },
    remainingCount(yamlSource: string): number {
      const agents = this.parseYaml(yamlSource)
      return Math.max(0, agents.length - 4) // Count the remaining agents
    },
    deleteAgentGroup(agentGroup: any): void {
      this.onActionAgentGroup = agentGroup
      this.deleteAgentGroupDialog = true
    },
    async confirmDeleteAgentGroup(): Promise<void> {
      if (this.onActionAgentGroup == null) return
      try {
        this.loading = true
        await this.agentGroupService.deleteAgentGroup(this.onActionAgentGroup.scanner, parseInt(this.onActionAgentGroup.id))
        this.reportSuccess('Agent group deleted successfully')
        this.agentGroups = this.agentGroups.filter((agentGroup) => agentGroup.id !== this.onActionAgentGroup.id)
      } catch (e: any) {
        this.reportError(e?.message || 'An error occurred while deleting the agent group')
      } finally {
        this.onActionAgentGroup = null
        this.loading = false
      }
    },
    updateAgentGroup(agentGroup: UpdatedAgentGroup): void {
      this.selectedAgentGroup = agentGroup
      this.showForm = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    onCloseForm(): void {
      this.showForm = false
      this.selectedAgentGroup = null
      this.loading = true
      this.fetchAgentGroups()
    },
    formatAgentKey(agentKey: string): string {
      const parts = agentKey.split('/')
      const org = parts[1]
      const name = parts[2]

      if (org === 'ostorlab') {
        return `@${name}`
      } else {
        return `@${org}/${name}`
      }
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
.chip-container {
  display: flex;
  flex-wrap: wrap;
}

.v-chip {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-chip__content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
