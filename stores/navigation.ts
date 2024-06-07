import { defineStore } from 'pinia'

interface NavigationActions {
  /**
   * Toggles the navigation drawer.
   */
  toggleDrawer(): void
}

interface NavigationState {
  drawer: boolean
}

export const useNavigationStore = defineStore<'navigation', NavigationState, Record<string, never>, NavigationActions>('navigation', {
  state: (): NavigationState => ({
    drawer: false
  }),
  actions: {
    /**
     * Toggle the navigation drawer.
     */
    toggleDrawer(): void {
      this.drawer = !this.drawer
    }
  }
})
