import create from 'zustand'

const useAuthStore = create((set) => ({
  authUser: localStorage.getItem('token') || null,
  setAuthUser: (user) => {
    localStorage.setItem('token', user)
    set({ authUser: user })
  },
  logout: () => {
    localStorage.removeItem('token')
    set({ authUser: null })
  }
}))

export default useAuthStore
