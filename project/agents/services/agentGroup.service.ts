import type { AxiosInstance } from 'axios'
import RequestHandler from '~/utils/requestHandler'
import type { Scanner } from '~/project/types'
import type { AssetTypeEnum, type OxoAgentGroupType, type Maybe } from '~/graphql/types'

const AGENT_GROUPS_QUERY = gql`
query AgentGroups ($assetType: AssetTypeEnum) {
  agentGroups (assetType: $assetType) {
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
mutation PublishAgentGroup ($agentGroup: OxoAgentGroupCreateInputType!) {
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
  private readonly requestHandler: RequestHandler

  constructor(axios: AxiosInstance) {
    this.requestHandler = new RequestHandler(axios)
  }

  /**
   * Get the list of agent groups.
   * @param Scanner - The scanner from which to fetch the agent groups.
   */
  async getAgentGroups(scanner: Scanner, assetType?: AssetTypeEnum): Promise<Array<Maybe<OxoAgentGroupType>>> {
    const response = await this.requestHandler.post(scanner,
      {
        query: AGENT_GROUPS_QUERY,
        variables: { assetType }
      })

    if ((response?.data?.errors || []).length > 0) {
      throw new Error(response?.data?.errors[0]?.message)
    }
    return response?.data?.data?.agentGroups?.agentGroups || []
  }

  /**
   * Create an agent group.
   * @param scanner The scanner where the agent group will be created.
   * @param agentGroup The agent group definition.
   */
  async createAgentGroup({ scanner, agentGroup }: { scanner: Scanner, agentGroup: OxoAgentGroupType }): Promise<Maybe<OxoAgentGroupType>> {
    const response = await this.requestHandler.post(scanner,
      {
        query: CREATE_AGENT_GROUP_MUTATION,
        variables: { agentGroup }
      })

    if ((response?.data?.errors || []).length > 0) {
      throw new Error(response?.data?.errors[0]?.message)
    }
    return response?.data?.data?.publishAgentGroup?.agentGroup
  }
}
