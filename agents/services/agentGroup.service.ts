import type { AxiosInstance } from 'axios'

const AGENT_GROUPS_QUERY = gql`
query AgentGroups {
  agentGroups {
    agentGroups {
      key
      id
      name
      description
    }
  }
}
`

const CREATE_AGENT_GROUP_MUTATION = gql`
mutation CreateAgentGroup ($agentGroup: AgentGroupCreateInputType!) {
    publishAgentGroup (agentGroup: $agentGroup) {
      agentGroup {
        id
        name
        description
        key
      }
    }
  }
`

export default class AgentGroupService {
  private readonly $axios: AxiosInstance

  constructor(axios: AxiosInstance) {
    this.$axios = axios
  }

  /**
   * Get the list of agent groups.
   */
  async getAgentGroups() {
    const response = await this.$axios.post('http://0.0.0.0:8002/apis/oxo',
      {
        query: AGENT_GROUPS_QUERY
      }
      , {
        headers: this.getAuthHeaders()
      })

    if ((response?.data?.errors || []).length > 0) {
      throw new Error(response.data.errors[0]?.message)
    }
    console
    return response?.data?.data?.agentGroups?.agentGroups || []
  }

  /**
   * Create an agent group.
   * @param agentGroup The agent group definition.
   */
  async createAgentGroup(agentGroup) {
    const response = await this.$axios.post('http://0.0.0.0:8002/apis/oxo',
      {
        query: CREATE_AGENT_GROUP_MUTATION,
        variables: { agentGroup }
      }
      , {
        headers: this.getAuthHeaders()
      })

    if ((response?.data?.errors || []).length > 0) {
      throw new Error(response.data.errors[0]?.message)
    }
    return response?.data?.data?.publishAgentGroup?.agentGroup
  }

  getAuthHeaders() {
    return {
      Authorization: 'Token 505be2aa5ae083d67ffe58577c8d88041fc139c6'
    }
  }
}
